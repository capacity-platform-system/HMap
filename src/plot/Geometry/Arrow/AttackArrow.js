/**
 * Created by FDD on 2017/5/24.
 * @desc 进攻方向
 * @Inherits ol.geom.Polygon
 */

import PlotTypes from '../../Utils/PlotTypes'
import {ol} from '../../../constants'
import * as PlotUtils from '../../Utils/utils'
import * as Constants from '../../Constants'
class AttackArrow extends (ol.geom.Polygon) {
  constructor (points, params) {
    super()
    ol.geom.Polygon.call(this, [])
    this.type = PlotTypes.ATTACK_ARROW
    this.headHeightFactor = 0.18
    this.headWidthFactor = 0.3
    this.neckHeightFactor = 0.85
    this.neckWidthFactor = 0.15
    this.headTailFactor = 0.8
    this.set('params', params)
    this.setPoints(points)
  }

  /**
   * 执行动作
   */
  generate () {
    try {
      let pnts = this.getPoints()
      let [pnt1, pnt2] = [pnts[0], pnts[1]]
      let len = PlotUtils.getBaseLength(pnts)
      let tailWidth = len * this.tailWidthFactor
      let neckWidth = len * this.neckWidthFactor
      let headWidth = len * this.headWidthFactor
      let tailLeft = PlotUtils.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, true)
      let tailRight = PlotUtils.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, false)
      let headLeft = PlotUtils.getThirdPoint(pnt1, pnt2, this.headAngle, headWidth, false)
      let headRight = PlotUtils.getThirdPoint(pnt1, pnt2, this.headAngle, headWidth, true)
      let neckLeft = PlotUtils.getThirdPoint(pnt1, pnt2, this.neckAngle, neckWidth, false)
      let neckRight = PlotUtils.getThirdPoint(pnt1, pnt2, this.neckAngle, neckWidth, true)
      let pList = [tailLeft, neckLeft, headLeft, pnt2, headRight, neckRight, tailRight]
      this.setCoordinates([pList])
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * 设置地图对象
   * @param map
   */
  setMap (map) {
    if (map && map instanceof ol.Map) {
      this.map = map
    } else {
      throw new Error('传入的不是地图对象！')
    }
  }

  /**
   * 获取当前地图对象
   * @returns {ol.Map|*}
   */
  getMap () {
    return this.map
  }

  /**
   * 判断是否是Plot
   * @returns {boolean}
   */
  isPlot () {
    return true
  }

  /**
   * 设置坐标点
   * @param value
   */
  setPoints (value) {
    this.points = !value ? [] : value
    if (this.points.length >= 2) {
      this.generate()
    }
  }

  /**
   * 获取坐标点
   * @returns {Array.<T>}
   */
  getPoints () {
    return this.points.slice(0)
  }

  /**
   * 获取点数量
   * @returns {Number}
   */
  getPointCount () {
    return this.points.length
  }

  /**
   * 更新当前坐标
   * @param point
   * @param index
   */
  updatePoint (point, index) {
    if (index >= 0 && index < this.points.length) {
      this.points[index] = point
      this.generate()
    }
  }

  /**
   * 更新最后一个坐标
   * @param point
   */
  updateLastPoint (point) {
    this.updatePoint(point, this.points.length - 1)
  }

  /**
   * 结束绘制
   */
  finishDrawing () {
  }
}

export default AttackArrow