from os import listdir
from PIL import Image

for i in listdir():
    if ".png" in i:
        print(i)
        Image.open(i).transpose(Image.FLIP_LEFT_RIGHT).save(i)