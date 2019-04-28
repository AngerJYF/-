
function getImg() {
    const imgListData = []
    // 25 为 需要展示的图片的总数量, 根据需要加载的数量，可自定数量 || 方法
    for (let i = 0; i < 25; i++) {
        let imgData = {
            title: '',
            // 图片加载路径
            img: require(`./images/${i + 1}.png`)
        }
        imgListData.push(imgData)
    }
    return imgListData
}

const Data = {
    partner: {
        title: '合作伙伴',
        partnerList: getImg()
    }
}
export default Data;