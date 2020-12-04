// 下载图片
export default {
    downloadByBlob(imgsrc,name='') {
        let image = new Image()
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = imgsrc
        image.onload = () => {
            let canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, image.width, image.height)
            canvas.toBlob((blob) => {
                let url = URL.createObjectURL(blob)
                download(url,name)
                // 用完释放URL对象
                URL.revokeObjectURL(url)
            })
        }
    }
}