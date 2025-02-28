import numpy as np

# read the data
data = np.loadtxt('ac1.txt')

A = data[:,0]
B = data[:,1]

score = 0

for i in range(len(A)):
    c = B == A[i]
    c = c.sum()
    score += A[i]*c


print('Score is:',score)