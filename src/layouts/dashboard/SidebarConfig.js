import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import eyeFill from '@iconify/icons-ant-design/eye-filled';
import plant from '@iconify/icons-akar-icons/plant';
import exchangeFill from '@iconify/icons-ri/exchange-fill';
import textFilefill from '@iconify/icons-eva/file-add-fill'
import voteFill from '@iconify/icons-fluent/vote-24-filled';
import safeFill from '@iconify/icons-bi/safe-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'your safes',
    path: '/user',
    icon: getIcon(safeFill)
  },
  {
    title: 'view open safes',
    path: '/products',
    icon: getIcon(eyeFill)
  },
  {
    title: 'yield farming',
    path: '/blog',
    icon: getIcon(plant)
  },
  {
    title: 'USDC exchange',
    path: '/login',
    icon: getIcon(exchangeFill)
  },
  {
    title: 'TBD',
    path: '/404',
    icon: getIcon(voteFill)
  },
  {
    title: 'documentation',
    path: '/404',
    icon: getIcon(textFilefill)
  }
];

export default sidebarConfig;
