/**
 * Created by rplees on 3/11/16.
 * 用户实体 偷懒,使用JSON格式,想要new User需要使用 Object.create(User)
 */
var User = {
    "portrait": null,
    "private_token": "",
    "bio": null,
    "name": "",
    "can_create_group": true,
    "can_create_project": true,
    "state": "active",
    "id": 95171,
    "email": "rplees.i.ly@gmail.com",
    "is_admin": false,
    "blog": null,
    "weibo": null,
    "theme_id": 1,
    "created_at": "2014-06-04T09:54:18+08:00",
    "new_portrait": "http://secure.gravatar.com/avatar/c9871eff6e22bb6229fa6dd14ad09db2?s=40&d=mm",
    "can_create_team": true,
    "follow": {
        "followers": 1,
        "starred": 6,
        "following": 0,
        "watched": 4
        },
    "username": ""
}

module.exports = User;