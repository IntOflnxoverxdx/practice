import requests
from bs4 import BeautifulSoup
import sys

a = sys.argv[1].replace('"','') if len(sys.argv) > 1 else False
if a:
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'}
    url = f'https://tochka24.com/catalog?limit=40&category=&q={a}'
    #print(url)
    page = requests.get(url,headers=headers)
    soup = BeautifulSoup(page.text,'html.parser')
    books = soup.find_all('div',class_='product-card')
    #cost = soup.find_all('span',class_='OS VS')
    #print(books[0].find_all("div",class_="product-title__head")[0].text.strip().encode().hex())
    #print(soup)
    text = ""
    for b in books:
        try:
            name = b.find("span",class_="name").text
            author = b.find("a",class_="author").text
            src = "https://tochka24.com"+b.find("span",class_="image").find("img")["src"]
            link = b.find("a",class_="info")['href']
            text += f"""<div class="bookCover">
            <div class="book__cover"><a href="book.php?src={link}"><img src="{src}" alt=""></a><div class="book__mark"></div></div>
            <a href="" class="book__name">{name}</a>
            <p class="book__author">{author}</p>
            </div>
            """
        except AttributeError:
            pass
    with open("text.txt","a") as f:
        print(text.encode().hex(),file=f)
    print(text.encode().hex())

else:
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'}
    url = f'https://tochka24.com/'
    page = requests.get(url,headers=headers)
    soup = BeautifulSoup(page.text,'html.parser')
    books = soup.find_all('div',class_='product-card')
    text = ""
    for b in books:
        try:
            name = b.find("span",class_="name").text
            author = b.find("a",class_="author").text
            src = "https://tochka24.com"+b.find("span",class_="image").find("img")["src"]
            link = b.find("a",class_="info")['href']
            text += f"""<div class="bookCover">
            <div class="book__cover"><a href="book.php?src={link}"><img src="{src}" alt=""></a><div class="book__mark"></div></div>
            <a class="book__name">{name}</a>
            <p class="book__author">{author}</p>
            </div>
            """
        except AttributeError:
            pass
    with open("text.txt","a") as f:
        print(text,file=f)
    print(text.encode().hex())