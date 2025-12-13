class DevJobsAvatarElement extends HTMLElement {
    constructor() {
        super();

        // Permite crear un shadow DOM para que el contenido no se vea en el DOM
        this.attachShadow({ mode: "open" });
    }

    createURL(service, username) {
        return `https://unavatar.io/${service}/${username}?v=4`;
    }


    render() {
        const service = this.getAttribute("service") ?? "github";
        const username = this.getAttribute("username") ?? "masch";
        const url = this.createURL(service, username);
        const size = this.getAttribute("size") ?? "40";

        this.shadowRoot.innerHTML = `
        <style>
            img {
                width: ${size}px;
                height: ${size}px;
                border-radius: 9999px;
            }
        </style>
        <img 
            src="${url}" 
            alt="Avatar de ${username}" 
            class="avatar"
            />
            
        `;
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define("devjobs-avatar", DevJobsAvatarElement);