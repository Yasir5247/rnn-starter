import { LayoutProvider } from "recyclerlistview";
import { Dimensions } from "react-native";

export class LayoutUtil {
  static getWindowWidth() {
    // To deal with precision issues on android
    return Math.round(Dimensions.get("window").width * 1000) / 1000 - 1; //Adjustment for margin given to RLV;
  }

  static getLayoutProvider(type: any) {
    switch (type) {
      case 0:
        return new LayoutProvider(
          () => {
            return "VSEL"; //Since we have just one view type
          },
          (type, dim, index) => {
            const columnWidth = LayoutUtil.getWindowWidth() / 3;
            switch (type) {
              case "VSEL":
                if (index % 3 === 0) {
                  dim.width = 3 * columnWidth;
                  dim.height = 300;
                } else if (index % 2 === 0) {
                  dim.width = 2 * columnWidth;
                  dim.height = 250;
                } else {
                  dim.width = columnWidth;
                  dim.height = 250;
                }
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 1: //Grid View Layout
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth() / 3;
                dim.height = 130;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 2: //Default Card Layout (Magic Card, Product Related)
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 500;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 3: //user row
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 60;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 4:
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 70;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 5: //message row - now available
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 40;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 6:
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 80;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 7: //Cart Screen
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 550;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 8: //Grid View Layout with filter
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth() / 2;
                dim.height = 300;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 9: //Grid View to Row View
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 150;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 10: //Message Row
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 30;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 11: //Shipping Row
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 470;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 12: //Discover_Shops_Row
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth() / 2;
                dim.height = 300;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 13: //Inventory Row
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 80;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 14: //Category Summary Row
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 350;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      case 15: //Discover_Shops_Row_new
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 210;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
      default:
        return new LayoutProvider(
          () => {
            return "VSEL";
          },
          (type, dim) => {
            switch (type) {
              case "VSEL":
                dim.width = LayoutUtil.getWindowWidth();
                dim.height = 300;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        );
    }
  }
}
