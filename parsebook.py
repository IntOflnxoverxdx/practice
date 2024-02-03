import requests
from bs4 import BeautifulSoup
import sys

a = sys.argv[1].replace('"','') if len(sys.argv) > 1 else False
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'}
page = requests.get(a,headers=headers)
soup = BeautifulSoup(page.text,'html.parser')
text = ""
name = soup.find("h1").text
properties = soup.find("div",class_="product_body_properties")
allp = properties.find_all("div",class_="product_body_property")
year = allp[0].find("div",class_="value").text
author = allp[1].find("div",class_="value").text
pages = allp[3].find("div",class_="value").text
izdat = allp[4].find("div",class_="value").text
src = soup.find("div",class_="product_big-image").find("img")["src"]
description = soup.find("div",class_="product_body_info_description").find("div",class_="seo-text").text.replace("Развернуть полностью","")
text += f"""
        <h2>
            {name}
        </h2>
        <div class="product">
            <img src="{src}" alt="">
            
            <div class="product__info">
                <div class="product__block">
                    <div class="product__key">Год</div>
                    <div class="product__value">{year}</div>
                </div>
                <div class="product__block">
                    <div class="product__key">Автор</div>
                    <div class="product__value">{author}</div>
                </div>
                <div class="product__block">
                    <div class="product__key">Количество страниц</div>
                    <div class="product__value">{pages}</div>
                </div>
                <div class="product__block">
                    <div class="product__key">Издательство</div>
                    <div class="product__value">{izdat}</div>
                </div>
            </div>
            <div class="product__description">
                <h3>Описание</h3>
                <div class="product__description__text">
                    {description}
                </div>
            </div>
        </div>
"""
print(text.encode().hex())