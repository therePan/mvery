// <script src="//api.map.baidu.com/api?v=2.0&ak=a4izOFN6pDpKi5ni1chTavgsv8rN6aMa"></script>
import constants from '../../helper/constants'

export const $ = constants('supers', [
  'location_load', // 获取地理位置信息
])

export const map = window && window.BMap ? new window.BMap.Map() : null

export function getCoords() {
  return new Promise((resolve, reject) => {
    const bmap = new window.BMap.Geolocation()
    bmap.getCurrentPosition((result) => {
      const address = result.address
      resolve({
        ...result,
        address: {
          ...address,
          remark: `${address.province}${address.city}${address.district}${address.street}${address.street_number}`,
        },
      })
    }, reject)
  })
}

export function getDistance(p1, p2) {
  const distance = map.getDistance(p1, p2)
  return distance < 1000 ? distance.toFixed(0) + 'm' : (Math.round(distance / 100) / 10).toFixed(1) + 'Km'
}
