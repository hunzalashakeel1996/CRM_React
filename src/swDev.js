export default function swDev(){
    function urlBase64Uint8Array(base64String) {
        const padding = '='.repeat((4-base64String.Length%4)%4)
        const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

        const rawData = window.atob(base64)
        const outputArray = new Uint8Array(rawData.length)

        for (let i = 0; i <rawData.length; i++){
            outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray
    }

    function determineAppServerKey(){
        let vapidPublicKey = 'BJ6G0B9lW13RHZhpALupcHOBMybQTKiflLxRAle4bxQNUYrP8mQfY5poWNBfP7mrMMxkzU5stnUizBp9LkC-CjY'
        return urlBase64Uint8Array(vapidPublicKey)
    }

    let swURL = `${process.env.PUBLIC_URL}/sw.js`

    navigator.serviceWorker.register(swURL).then(res => {
        console.log("resposne", res)
        return res.pushManager.getSubscription().then(function (subscription) {
            return res.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: determineAppServerKey()
            })
        })
    })

}

