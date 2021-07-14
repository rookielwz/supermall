import { request } from './request'

export function getCategoryList () {
  return request({
    url: '/category'
  })
}

export function getSubcategory (maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}