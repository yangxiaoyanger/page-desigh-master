import braidBg from './bg/index.vue'
import braidPic from './pic/index.vue'
import braidTxt from './txt/index.vue'
import braidContainer from './container/index.vue'


import braidButton from './iview/button/index.vue'
import braidGrid from './iview/grid/index.vue'
import braidColumn from './iview/column/index.vue'
import braidTable from './iview/table/index.vue'
import braidInput from './iview/input/index.vue'


import braidLine from './echarts/line/index.vue'
import braidBar from './echarts/bar/index.vue'


import dataVBorder from './dataV/border/border.vue'
import dataVDecotation from './dataV/decoration/decoration.vue'


export default {
  [braidBg.name]: braidBg,
  [braidPic.name]: braidPic,
  [braidTxt.name]: braidTxt,
  [braidContainer.name]: braidContainer,

  [braidButton.name]: braidButton,
  [braidGrid.name]: braidGrid,
  [braidColumn.name]: braidColumn,
  [braidTable.name]: braidTable,
  [braidInput.name]: braidInput,

  [braidLine.name]: braidLine,
  [braidBar.name]: braidBar,




  [dataVBorder.name]: dataVBorder,
  [dataVDecotation.name]: dataVDecotation
}
