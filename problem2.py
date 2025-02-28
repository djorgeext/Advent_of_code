import numpy as np
import pickle

input_file = open('ac2.txt')

input_file = open('ac2.txt')
data_list = [[int(j) for j in l.split()] for l in input_file]

input_file.close()

safe_list = 0

for i in range(len(data_list)):
    element = np.array(data_list[i])
    temp = np.sort(element)
    temp1 = np.flip(temp)

    if element == temp1 or element == temp:
        safe_list += 1
    else:
        pass

print('Safe list is:',safe_list)