export const menuList = [
  {
    "id"    : 1,
    "title" : "Dashboard",
    "mainMenu" : [
      {
        "id"   : 2,
        "name" : "Dahboard",
        "icon" : "fas fa-fire",
        "link" : "/dashboard"
      }
    ]
  },
  {
    "id"    : 3,
    "title" : "Master Data",
    "mainMenu" : [
      {
        "id"   : 4,
        "name" : "User",
        "icon" : "fas fa-user",
        "link" : "/user"
      },
      {
        "id"   : 5,
        "name" : "Barang",
        "icon" : "fas fa-th-large",
        "link" : "/barang",
        "sub"  : [
          {
            "id"   : 6,
            "name" : "Jenis",
            "link" : "/jenis_barang"
          },
          {
            "id"   : 7,
            "name" : "Barang",
            "link" : "/barang"
          },
        ]
      }
    ]
  },
  {
    "id"    : 8,
    "title" : "Penjualan",
    "mainMenu" : [
      {
        "id"   : 9,
        "name" : "Penjualan",
        "icon" : "fas fa-cart-plus",
        "link" : "/penjualan"
      }
    ]
  },
  {
    "id"    : 10,
    "title" : "Laporan",
    "mainMenu" : [
      {
        "id"    : 11,
        "name" : "Penjualan",
        "icon" : "fas fa-file-alt",
        "link" : "/penjualan",
        "sub"  : [
          {
            "id"    : 12,
            "name" : "Penjualan/barang",
            "link" : "/laporan_penjualan"
          },
          {
            "id"    : 13,
            "name" : "Penjualan/Jenis Barang",
            "link" : "/laporanpenjualan_jenis"
          }
        ]
      }
    ]
  }
]