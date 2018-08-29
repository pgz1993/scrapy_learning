from urllib.parse import urlparse,unquote
from os.path import basename, dirname, join
url = """https://images.dmzj.com/b/%E4%B8%8D%E4%B9%89%E8%81%94%E7%9B%9F%20%E4%BA%BA%E9%97%B4%E4%B9%8B%E7%A5%9E/%E7%AC%AC04%E5%8D%B7_1360247187/14.jpg"""
path = urlparse(url).path
# print(path)
path = unquote(path, encoding="utf-8").replace(" ","_").replace("/","_")


# basename1 = path.split("/")[-1]
# dirname1 = path.split("/")[:-1]

# already_joined = join(basename(dirname(path)), basename(path))
already_joined = join(dirname(path), basename(path))
print("path = %s" %path)
# print("basename = %s" %basename1)
# print("dirname = %s" %dirname1)
print("already_joined = %s" %already_joined)

# print("/"+dirname(path).split("/")[1] + "/")
print(dirname(path))
# print(type(path))
