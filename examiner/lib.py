import random, json
import numpy as np 

ROOT_CHOICES = range(-10, 10)
K_CHOICES = range(-10, 10)
K_CHOICES.remove(0)

def get_root(single_solution=False):
	if single_solution:
		return json.dumps([random.choice(ROOT_CHOICES)])
	return json.dumps([random.choice(ROOT_CHOICES), random.choice(ROOT_CHOICES)])

def get_coefficients(x):
	x = json.loads(x)
	k = random.choice(K_CHOICES)
	if len(x) == 2:
		coefficients = np.poly(x)
		coefficients = [x*k for x in coefficients]
		return json.dumps(coefficients)
	elif len(x) == 1:
		coefficients = np.poly(x*2)
		coefficients = [x*k for x in coefficients]
		return json.dumps(coefficients)
	elif len(x) == 0:
		x = complex(round(random.uniform(0,10), 1), round(random.random(), 2))
		coefficients = np.poly([x, x.conjugate()])
		coefficients = [round(x*k, 1) for x in coefficients]
		return json.dumps(coefficients)
	else:
		return None
	