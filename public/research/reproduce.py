#!/usr/bin/env python3
"""Reproduce analytical examples in WEBSPACEAI research articles.
Standard library only. No model inference, GPU benchmark, or robot experiment.
"""
import itertools
import json
import math

def no_contrast(p, group_size):
    assert 0 <= p <= 1 and group_size >= 2
    return (1-p)**group_size + p**group_size

def kv_bytes(layers, tokens, kv_heads, head_dim, element_bytes=2, sequences=1):
    assert all(v > 0 for v in (layers,tokens,kv_heads,head_dim,element_bytes,sequences))
    return 2*layers*tokens*kv_heads*head_dim*element_bytes*sequences

def wilson(successes, trials, z=1.959963984540054):
    assert 0 <= successes <= trials and trials > 0
    p=successes/trials; denominator=1+z*z/trials
    center=(p+z*z/(2*trials))/denominator
    radius=z*math.sqrt(p*(1-p)/trials+z*z/(4*trials*trials))/denominator
    return [center-radius,center+radius]

def answer_allowed(relevant, supported, contradiction):
    return relevant and supported and not contradiction

def allowed(action, capability):
    return (action['operation']==capability['operation']
            and action['target']==capability['target']
            and action.get('payload_hash')==capability.get('payload_hash'))

def main():
    assert abs((.95**8)-0.6634204312890623)<1e-12
    assert abs((.95**16)-0.44012666865176536)<1e-12
    assert kv_bytes(32,32768,8,128)==4*1024**3
    assert kv_bytes(32,8192,8,128)==1024**3
    assert kv_bytes(32,32768,32,128)==16*1024**3
    assert kv_bytes(32,32768,8,128,sequences=8)==32*1024**3
    cases=[]
    for r,s,c in itertools.product((False,True),repeat=3):
        expected=(r,s,c)==(True,True,False)
        result=answer_allowed(r,s,c);assert result==expected
        cases.append(dict(relevant=r,supported=s,contradiction=c,answer=result))
    capability=dict(operation='read',target='document:A',payload_hash=None)
    tests=[(dict(operation='read',target='document:A'),True),
           (dict(operation='send',target='recipient:B'),False),
           (dict(operation='write',target='document:A'),False),
           (dict(operation='read',target='document:B'),False)]
    for action,expected in tests:assert allowed(action,capability)==expected
    exact_write=dict(operation='write',target='document:A',payload_hash='prepared-digest')
    assert allowed(dict(exact_write),exact_write)
    assert not allowed(dict(operation='write',target='document:A',payload_hash='altered-digest'),exact_write)
    return {'scope':'Analytical calculations and deterministic toy-policy tests only; not empirical AI benchmark results.',
            'binary_rewards':{'p':.05,'G8_all_fail':.95**8,'G8_no_contrast':no_contrast(.05,8),'G16_all_fail':.95**16},
            'kv_cache_GiB':{'32k_GQA':kv_bytes(32,32768,8,128)/1024**3,'8k_GQA':kv_bytes(32,8192,8,128)/1024**3,'32k_32heads':kv_bytes(32,32768,32,128)/1024**3,'eight_32k_sequences':kv_bytes(32,32768,8,128,sequences=8)/1024**3},
            'hypothetical_70_of_100_Wilson95':wilson(70,100),
            'rag_policy_cases':cases,'capability_policy_cases_passed':len(tests)+2}
if __name__=='__main__':print(json.dumps(main(),indent=2))
