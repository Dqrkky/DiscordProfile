class DiscordProfile {
    constructor(config) {
        this.config = {
            "user": {
                "id": null,
                "name": null,
                "discriminator": null,
                "avatar": {
                    "url": null
                }
            },
            "profile": {
                "status": "offline",
                "message": "I'm currently not doing something"
            }
        }
        if (config && config.user) {
            if (config.user.id) this.config.user.id = config.user.id
            if (config.user.name) this.config.user.name = config.user.name
            if (config.user.discriminator) this.config.user.discriminator = config.user.discriminator
            if (config.user.avatar && config.user.avatar.url) this.config.user.avatar.url = config.user.avatar.url
        }
        if (config && config.profile) {
            if (config.profile.status && ["online", "dnd", "idle", "offline"].includes(config.profile.status.toLowerCase())) {
                this.config.profile.status = config.profile.status.toLowerCase()
            }
            if (config.profile.message) this.config.profile.message = config.profile.message
        }
    }
    getHtml = (type) => {
        const box_main = document.createElement("div")
        box_main.classList = "box-main"

        const profile_image = document.createElement("img")
        profile_image.classList.add("profile_image")
        profile_image.alt = "Person"
        profile_image.src = this.config.user.avatar.url
        box_main.appendChild(profile_image)

        var profile_status = new Object()
        if (this.config.profile.status.toLowerCase() == "online") {
            var profile_status_online = document.createElement("div")
            profile_status_online.classList.add("profile_status")
            profile_status_online.classList.add("profile_status_online")
            box_main.appendChild(profile_status_online)
            profile_status["type"] = this.config.profile.status.toLowerCase()
            profile_status[`status_${this.config.profile.status.toLowerCase()}`] = profile_status_online
        }

        if (this.config.profile.status.toLowerCase() == "dnd") {
            var profile_status_dnd = document.createElement("div")
            profile_status_dnd.classList.add("profile_status")
            profile_status_dnd.classList.add("profile_status_dnd")
            box_main.appendChild(profile_status_dnd)

            var profile_status_dnd_line = document.createElement("div")
            profile_status_dnd_line.classList.add("profile_status_dnd_line")
            profile_status_dnd.appendChild(profile_status_dnd_line)
            profile_status["type"] = this.config.profile.status.toLowerCase()
            profile_status[`status_${this.config.profile.status.toLowerCase()}`] = profile_status_dnd
            profile_status[`status_${this.config.profile.status.toLowerCase()}_line`] = profile_status_dnd_line
        }

        if (this.config.profile.status.toLowerCase() == "idle") {
            var profile_status_idle = document.createElement("div")
            profile_status_idle.classList.add("profile_status")
            box_main.appendChild(profile_status_idle)

            var profile_status_idle_star = document.createElement("div")
            profile_status_idle_star.classList.add("profile_status_idle_star")
            profile_status_idle.appendChild(profile_status_idle_star)
            profile_status["type"] = this.config.profile.status.toLowerCase()
            profile_status[`status_${this.config.profile.status.toLowerCase()}`] = profile_status_idle
            profile_status[`status_${this.config.profile.status.toLowerCase()}_star`] = profile_status_idle_star
        }

        if (this.config.profile.status.toLowerCase() == "offline") {
            var profile_status_offline = document.createElement("div")
            profile_status_offline.classList.add("profile_status")
            profile_status_offline.classList.add("profile_status_offline")
            box_main.appendChild(profile_status_offline)

            var profile_status_offline_cyrcle = document.createElement("div")
            profile_status_offline_cyrcle.classList.add("profile_status_offline_cyrcle")
            profile_status_offline.appendChild(profile_status_offline_cyrcle)
            profile_status["type"] = this.config.profile.status.toLowerCase()
            profile_status[`status_${this.config.profile.status.toLowerCase()}`] = profile_status_offline
            profile_status[`status_${this.config.profile.status.toLowerCase()}_cyrcle`] = profile_status_offline_cyrcle
        }

        const box_second = document.createElement("div")
        box_second.classList.add("box-second")
        box_main.appendChild(box_second)

        const profile_name = document.createElement("span")
        profile_name.classList.add("profile_name")
        profile_name.innerText = this.config.user.name
        box_second.appendChild(profile_name)

        if (this.config.user.discriminator) {
            const profile_discriminator = document.createElement("span")
            profile_discriminator.classList.add("profile_discriminator")
            profile_discriminator.innerText = `#${this.config.user.discriminator}`
            profile_name.innerHTML += profile_discriminator.outerHTML
        }

        const profile_line = document.createElement("div")
        profile_line.classList.add("profile_line")
        box_second.appendChild(profile_line)

        const profile_currently = document.createElement("div")
        profile_currently.classList.add("profile_currently")
        profile_currently.innerText = this.config.profile.message
        box_second.appendChild(profile_currently)

        if (type && type == "analytical") {
            return {
                "box_main": box_main,
                "profile_image": profile_image,
                "profile_status": profile_status,
                "box_second": box_second,
                "profile_name": profile_name,
                "profile_discriminator": profile_discriminator,
                "profile_line": profile_line,
                "profile_currently": profile_currently
            }
        } else {
            return box_main
        }
    }
}

export default {
    DiscordProfile
}