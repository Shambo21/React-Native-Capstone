import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('little_lemon');


export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                //tx.executeSql('DROP TABLE IF EXISTS menuitems', []);
                tx.executeSql('create table if not exists menuitems (id integer primary key not null, name text, description text, image text, price text, category text);');
            },
            reject,
            resolve
        );
    });
};

export async function getMenuItems() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM menuitems', [], (_, { rows }) => {
                resolve(rows._array);
            },(error)=> console.log(error));
        });
    });
}

export function saveMenuItems(menuItems) {
    db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO menuitems (id, name, description, image, price, category) VALUES ${menuItems
            .map((item) =>
            `(${item.id}, '${item.name}', '${item.description.replace("'", "")}', '${item.image}', '${item.price}', '${item.category}')`)
            .join(', ')}`)
      }, (e) => console.log(e));
};

export async function filterByQueryAndCategories(query, activeCategories) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        let newQuery = [];
        activeCategories.forEach(category => {
          newQuery.push(`category='${category}'`);
        });
        newQuery = newQuery.join(" OR ");
        const querySql = `SELECT * FROM menuitems WHERE (${newQuery}) ${query === "" ? "" : `AND  lower (name) LIKE lower ('%${query}%')`}`;
        tx.executeSql(querySql, [], (_, { rows }) => {
          resolve(rows._array);
        });
      });
    });
  };