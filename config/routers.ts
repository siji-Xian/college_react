const routes = [
  {
    path: '/',
    component: './login',
    wrappers: ['@/pages/isLogin'],
    headerRender: false,
    footerRender: false,
    menuRender: false,
    exact: true,
  },
  // {
  //   path: '/welcome',
  //   name: '首页',
  //   component: './home',
  //   exact: true,
  // },
  {
    path: '/chooseBrand',
    component: './login/chooseBrand',
    wrappers: ['@/pages/Authorized'],
    footerRender: false,
    menuRender: false,
  },
  {
    path: '/changeInfo',
    wrappers: ['@/pages/Authorized'],
    component: '@/pages/changeInfo',
  },

  {
    path: '/searchResult',
    wrappers: ['@/pages/Authorized'],
    component: '@/pages/searchResult',
  },

  {
    name: '营销科学',
    wrappers: ['@/pages/Authorized'],
    icon: 'ReadOutlined',
    path: '/repository',
    routes: [
      {
        path: '/repository/introduce',
        wrappers: ['@/pages/Authorized'],
        name: '了解营销',
        component: '@/pages/introduce',
        exact: true,
      },
      {
        path: '/repository/caseLibrary',
        wrappers: ['@/pages/Authorized'],
        name: '案例库',
        component: '@/pages/caseLibrary',
        exact: true,
      },
      {
        path: '/repository/video',
        wrappers: ['@/pages/Authorized'],
        icon: 'PieChart',
        name: '视频库',
        component: '@/pages/repository',
        exact: true,
      },
      {
        path: '/repository/showPdf',
        component: '@/pages/caseLibrary/showPdf',
        wrappers: ['@/pages/Authorized'],
        exact: true,
      },
      {
        path: '/repository/guide',
        component: '@/pages/introduce/show',
        wrappers: ['@/pages/Authorized'],
        exact: true,
      },

      {
        path: '/repository/repositoryVideo',
        component: '@/pages/repository/reqositoryVideo',
        wrappers: ['@/pages/Authorized'],
        exact: true,
      },
      {
        wrappers: ['@/pages/Authorized'],
        component: '@/pages/404',
      },
    ],
  },
  {
    name: '营销认证',
    wrappers: ['@/pages/Authorized'],
    icon: 'BarChart',
    path: '/examine',
    routes: [
      {
        path: '/examine/index',
        wrappers: ['@/pages/Authorized'],
        icon: 'PieChart',
        name: '报名考试',
        component: '@/pages/examine',
        exact: true,
      },
      {
        path: '/examine/examinationPaper',
        component: '@/pages/examine/examinationPaper',
        wrappers: ['@/pages/Authorized'],
        footerRender: false,
        menuRender: false,
        exact: true,
      },
      {
        path: '/examine/resultsList',
        wrappers: ['@/pages/Authorized'],
        icon: 'PieChart',
        name: '考试记录',
        component: '@/pages/resultsList',
        exact: true,
      },
      {
        path: '/examine/resultsList/resultsListPaper',
        wrappers: ['@/pages/Authorized'],
        component: '@/pages/resultsList/resultsListPaper',
        exact: true,
      },
      {
        wrappers: ['@/pages/Authorized'],
        component: '@/pages/404',
      },
    ],
  },
  {
    name: '营销策略',
    wrappers: ['@/pages/solution'],
    icon: 'ReadOutlined',
    routes: [
      {
        path: '/solution',
        wrappers: ['@/pages/Authorized'],
        name: '案例分享',
        component: '@/pages/solution',
        exact: true,
      },
      {
        path: '/solution/showPdf',
        component: '@/pages/solution/showPdf',
        wrappers: ['@/pages/Authorized'],
        exact: true,
      },

      {
        wrappers: ['@/pages/Authorized'],
        component: '@/pages/404',
      },
    ],
  },
  {
    wrappers: ['@/pages/Authorized'],
    component: '@/pages/404',
  },
];

export default routes;
