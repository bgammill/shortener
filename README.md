# shortener

A small URL shortening service via Cloud Functions for Firebase.

## Services

### shorten

Takes a URL parameter and returns an ID.

**input**
```
shorten?url=https://github.com
```
**output**
```
{"status": "success", "id": "-LUT14pGL1pRscnvJGX_"}
```

### lengthen

Takes an ID parameter and returns a URL.

**input**
```
lengthen?id=-LUT14pGL1pRscnvJGX_
```
**output**
```
{"status": "success", "url": "https://github.com"}
```

### redirect

Takes an ID parameter and redirects to the corresponding URL.

```
redirect?id=-LUT14pGL1pRscnvJGX_
```

## Built With

* [Firebase](https://firebase.google.com/) - The FaaS platform
* [Node](https://nodejs.org) - The JS runtime
* [nanoid](https://zelark.github.io/nano-id-cc/) - A unique id generator

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
