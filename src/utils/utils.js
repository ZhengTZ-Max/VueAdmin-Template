class Session {
  constructor() {
    const STORAGE = sessionStorage;
    this.get = (key) => {
      return STORAGE.getItem(key);
    };
    this.getJson = (key) => {
      return (STORAGE.getItem(key) == true) && JSON.parse(STORAGE.getItem(key));
    };
    this.set = (key, value) => {
      STORAGE.setItem(key, JSON.stringify(value));
    };
    this.remove = (key) => {
      STORAGE.removeItem(key);
    };
    this.clear = () => {
      STORAGE.clear();
    };
  }
}
export const Storage = new Session();

export function filterMenuList(list) {
  return list.map((item, index) => {
    let row = {
      ...item,
      meta: {
        title: item.title,
      },
      component: item.component || "Layout",
      asyncComponent:item.component || "Layout",
      // title: item.title,
      // path: item.path,
      // icon: item.icon,
      // redirect: item.redirect || '',
      // showMenu:item.showMenu,
      // noCache: false,
      // hidden: item.hidden || false,
      // jump: false,
      // children: item.children,
    };
    if (row.children && row.children.length) {
      row.children = filterMenuList(row.children);
    }
    return row;
  });
}
