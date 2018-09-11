/*
	验证当前菜单权限
*/

import Fetch from './fetch';

async function tree(url) {
  let router = url.match(/(\/\w+\/\w+)*/gi);
  let rule = router && router.length > 0
    ? router[0].replace('/', '')
    : '';

  let val = await Fetch({
    url: '/sys/checkMenuRule',
    method: 'POST',
    param: {
      rule: rule
    }
  });

  if (!val.succeed) {
    window.location.hash = '#/';
  }
}


export default tree; 