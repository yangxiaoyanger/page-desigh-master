import braidBg from './bg/index.vue'
import braidPic from './pic/index.vue'
import braidTxt from './txt/index.vue'
import braidContainer from './container/index.vue'


import braidButton from './iview/button/index.vue'
import braidGrid from './iview/grid/index.vue'
import braidColumn from './iview/column/index.vue'
import braidTable from './iview/table/index.vue'
import braidInput from './iview/input/index.vue'

export default {
  [braidBg.name]: braidBg,
  [braidPic.name]: braidPic,
  [braidTxt.name]: braidTxt,
  [braidContainer.name]: braidContainer,

  [braidButton.name]: braidButton,
  [braidGrid.name]: braidGrid,
  [braidColumn.name]: braidColumn,
  [braidTable.name]: braidTable,
  [braidInput.name]: braidInput
}
