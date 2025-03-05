import numpy as np
import pickle

input_file = open('ac2.txt')

data_list = [[int(j) for j in l.split()] for l in input_file]

input_file.close()

safe_list = 0

for i in range(len(data_list)):
    element = data_list[i]
    temp = element.copy()
    temp.sort()
    temp1 = element.copy()
    temp1.sort(reverse=True)

    if element == temp or element == temp1:
        difference = np.abs(np.diff(np.array(element)))
        if np.all(difference >= 1) and np.all(difference <= 3):
            safe_list += 1
    else:
        continue

print('Safe list is:',safe_list)