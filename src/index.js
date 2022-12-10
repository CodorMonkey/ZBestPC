import './css/public.css'
import './css/index.css'

import 'jquery'
import './js/public'
import './js/nav'
import { get } from 'lodash-es'
import { foo, bar } from './js/tools'

console.log(get({ foo: 100 }, 'foo'))
foo()
console.log('开始更新架构')