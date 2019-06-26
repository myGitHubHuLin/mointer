import React from 'react';
import './style/index.scss';

interface props {
    data?:any
}
export default class TextEcg extends React.Component<any,props>{

    private allData:any=[] // 最终的数据
    private width?:number /** 画布的宽度 */
    private height?:number  /** 画布的高度 */
    private ctx:any /** 线的画笔 */
    private startY:any/** 每个坐标起始的位置 */
    private x:any /** 每分x */
    private clearnWidth:any = 20 /** 需要清除数据的宽度 */
    private clearnHeight:any /** 需要清除数据的高度 */
    private index:any = 0    /** 记录当前要更新数据的下标 */
    private dataIndex:any=0 /**（内层数据）动画的下标 */
    private lastPoint:any
    
    componentDidMount() {
        let {option} = this.props
        let canvas: any = document.getElementById('canvas')   // ctx是一个画笔
        this.startY = 0
        this.height = 250 // document.getElementById('canvas').getBoundingClientRect().height
        this.clearnHeight = 250// document.getElementById('canvas').getBoundingClientRect().height, // 获取画布的宽高，定义起始点的位置
        this.width = 750 // document.getElementById('canvas').getBoundingClientRect().width
        this.ctx = canvas.getContext('2d')
        this.darwData()
    }

    darwData=()=>{  // 每次画图的数据处理，再传入到具体的画图逻辑
        let {option,data}=this.props
        console.log(option,data)
    setInterval(()=>{
        this.allData = this.allData.concat(data)
        this.darw(option[0],data)
        // this.darwData(this.allData)  // 处理数据的方法
    },500)
       // this.darw(option[0],this.allData)
    }

    darw=(item?:any,data?:any)=>{ // 画图 item:画线的一些属性,data:画线的数据
        let start = this.startY + item.coordinateY        // 每个height的起始点
        let y:number =250/(item.maxValue - item.minValue) // 画图每一份y的高度
        this.x=750/item.length                       // 画图每一份x宽度
        // this.ctx.moveTo(0, 250)  // 起始点位
          this.ctx.beginPath()
      if(this.index<item.length){
          if(this.dataIndex<=data.length){
            this.ctx.moveTo(this.x*this.index, y*this.lastPoint)  // 起始点位
            this.ctx.lineTo(this.x*this.index-1, y*data[this.dataIndex]) // 当数据为respData时数据为   起始高度-数值 (其他的都是正常的)
            this.ctx.stroke()
            if(this.dataIndex!==0){
                this.lastPoint = data[this.dataIndex]
              }
            this.dataIndex+=1
            this.index+=1
           // console.log(this.dataIndex)
           setTimeout(()=>{
                this.clearcanvans(this.index*this.x)
                this.darw(item,data)
           },(500/1900)*this.index)
            // window.requestAnimationFrame(()=>{
            //     this.clearcanvans(this.dataIndex)
            //     this.darw(item,data)
            // })
        }else{
            this.dataIndex = 0
            this.lastPoint = data[data.length-1]
        }
      }else{
          this.index = 0
      }
    }

    clearcanvans =(x:any)=>{  // 清除一部分的数据，形成空白
        let clearnHeight = this.clearnHeight  // 阴影部分的高度
        let clearnWidth = this.clearnWidth    // 阴影部分的宽度
        this.ctx.clearRect(x, 0, clearnWidth, clearnHeight)
    }

    render() {
        return (<div style={{width:'100%',height: '100%',alignItems: 'center',display: 'flex',justifyContent: 'center'}}>
           <div>
                <canvas id="canvas" width={'750'} height={'250'}>浏览器不支持html5</canvas>
           </div>
           {/*<div style={{width:'100%',height: '100%',position:'absolute'}}>
              <canvas id="canvasBackground" width={'750'} height={'250'} >
                  浏览器不支持html5</canvas>
           </div>*/}
        </div>)
    }
}