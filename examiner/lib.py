import random, json
import numpy as np 

MIN_ROOT = -25
MAX_ROOT = 25
K_CHOICES = range(1, 10)

def get_root(single_solution=False):
	if single_solution:
		if(bool(random.getrandbits(1))):
			return json.dumps([round(random.uniform(MIN_ROOT, MAX_ROOT),1)])
		return json.dumps([random.choice(range(MIN_ROOT, MAX_ROOT))])
	else:
		roots = []
		while len(roots) < 2:
			roots.append(random.choice(range(MIN_ROOT, MAX_ROOT)) if bool(random.getrandbits(1)) else round(random.uniform(MIN_ROOT, MAX_ROOT),1))
		return json.dumps(roots)

def get_coefficients(x):
	x = json.loads(x)
	k = random.choice(K_CHOICES) if bool(random.getrandbits(1)) else 1
	if len(x) == 2:
		coefficients = np.poly(x)
		coefficients = [round(x*k,1) for x in coefficients]
		return json.dumps(coefficients)
	elif len(x) == 1:
		coefficients = np.poly(x*2)
		coefficients = [round(x*k,1) for x in coefficients]
		return json.dumps(coefficients)
	elif len(x) == 0:
		x = complex(round(random.uniform(0,10), 1), round(random.random(), 2))
		coefficients = np.poly([x, x.conjugate()])
		coefficients = [round(x*k, 1) for x in coefficients]
		return json.dumps(coefficients)
	else:
		return None
	