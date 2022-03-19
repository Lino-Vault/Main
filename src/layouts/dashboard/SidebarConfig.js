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
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Your Safes',
    path: 'safes',
    icon: getIcon(safeFill)
  },
  {
    title: 'View Open Safes',
    path: 'view',
    icon: getIcon(eyeFill)
  },
  {
    title: 'Yield Farming',
    path: 'farming',
    icon: getIcon(plant)
  },
  {
    title: 'USDC Exchange',
    path: 'exchange',
    icon: getIcon(exchangeFill)
  },
  {
    title: 'TBD',
    path: '/404',
    icon: getIcon(voteFill)
  },
  {
    title: 'Documentation',
    path: 'doc',
    icon: getIcon(textFilefill)
  }
];

export default sidebarConfig;
