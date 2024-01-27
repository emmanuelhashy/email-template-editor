import { computed, reactive } from "vue";
import 'vue-toast-notification/dist/theme-bootstrap.css'
import { useToast } from 'vue-toast-notification';

export type Bool = {
  name: string;
  value: any;
}

type Properties = {
  size?: string;
  alignment?: "left" | "right" | "center";
};

type TextSize = {
  name: string;
  size: string;
};

type Content = {
  component: string;
  text?: string;
  align?: string;
  imageUrl?: string;
}

type SanitizedTemplateData = {
  template: TemplateData;
}

type TemplateData = {
  subject: string;
  bannerImageUrl: string;
  showSocialCampaign: Boolean;
  body: Content[]
}

type Temp = {
  template: TemplateData
}

type Template = {
  ID: string;
  userId: string;
  createdAt: string;
  data: Temp
}

type errors = {
  subject: string | undefined;
}
export type component = {
  id: number;
  name: string;
  iconType: string;
  value: string;
  order: number;
  showMenu?: Boolean;
  disabled?: Boolean;
  properties?: Properties;
};

export type Config = {
  subject: string;
  bannerUrl: string;
  showBanner: Boolean;
  showCampaign: Boolean;
};

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
};

const defaultComponentTypes = <component[]>[
  {
    id: 1,
    name: "Image",
    iconType: "image",
    order: 1,
    value: "",
    showMenu: false,
    disabled: false
  },
  {
    id: 2,
    name: "Text",
    iconType: "text",
    order: 2,
    value: "",
    showMenu: false,
    disabled: false,
    properties: {
      size: "",
      alignment: "center",
    },
  },
  {
    id: 3,
    name: "Paragraph",
    iconType: "paragraph",
    value: "",
    showMenu: false,
    disabled: false,
    order: 3,
    properties: {
      alignment: "center",
    },
  },
];

const defaultComponentTypesUnTempered = <component[]>[
  {
    id: 1,
    name: "Image",
    iconType: "image",
    order: 1,
    value: "",
    showMenu: false,
    disabled: false
  },
  {
    id: 2,
    name: "Text",
    iconType: "text",
    order: 2,
    value: "",
    showMenu: false,
    disabled: false,
    properties: {
      size: "",
      alignment: "center",
    },
  },
  {
    id: 3,
    name: "Paragraph",
    iconType: "paragraph",
    value: "",
    showMenu: false,
    disabled: false,
    order: 3,
    properties: {
      alignment: "center",
    },
  },
];

const defaultConfigData = <Config>{
  subject: "",
  bannerUrl: "",
  showBanner: false,
  showCampaign: false
}
function setDisabledState(id: number, value: Boolean) {
  for (let index = 0; index < store.state.componentTypes.length; index++) {
    const element = store.state.componentTypes[index];
    if (element.id === id) {
      store.state.componentTypes[index].disabled = value;
    }

  }
}
function escapeSingleQuotes(inputString: string) {
  return inputString.replace(/'/g, "\\'");
}
const toast = useToast();
const triggerToast = (message: string, type: string) => {
  toast.clear()
  toast.success(message, {
    position: "top-right",
    type: type
  });
}
let paragraphCounter = 0;
let textCounter = 0;
let imageCounter = 0;

const emitEvent = (eventName: string, payload: any) => {
  const event = new CustomEvent(eventName, { detail: payload });
  window.dispatchEvent(event);
};

export const store = {
  state: reactive({
    componentList: <component[]>[],
    componentTypes: defaultComponentTypes,
    configData: defaultConfigData,
    orderTracker: <number>0,
    templates: <Template[]>[],
    template: <Template>{},
    loadingTemplates: false,
    loadingTemplate: false,
    creatingTemplate: false,
    showMenu: false,
    reOrderComponents: false,
    showOptions: false,
    options: [{ name: "Yes", value: true }, { name: "No", value: false }],
    fieldErrors: <errors>{
      subject: undefined
    }
  }),
  toggleArrows: () => {
    store.state.reOrderComponents = !store.state.reOrderComponents
  },
  closeAllMenu: () => {
    for (let i in store.state.componentList) {
      store.state.componentList[i].showMenu = false;
    }
    store.state.showMenu = false;
  },
  toggleMenu: (id: number) => {
    for (let i in store.state.componentList) {
      if (store.state.componentList[i].id == id) {
        store.state.componentList[i].showMenu = !store.state.componentList[i].showMenu;
        break;
      }
    }
  },
  findFirstPosition: (objectToFind: component) => {
    const componentList = store.state.componentList;
    let position = -1;

    for (let i = 0; i < componentList.length; i++) {
      if (JSON.stringify(componentList[i]) === JSON.stringify(objectToFind)) {
        position = i;
        break;
      }
    }

    if (position === 0) {
      return true
    } else {
      return false
    }
  },
  findLastPosition: (objectToFind: component) => {
    const componentList = store.state.componentList;
    let position = -1;

    for (let i = 0; i < componentList.length; i++) {
      if (JSON.stringify(componentList[i]) === JSON.stringify(objectToFind)) {
        position = i;
        break;
      }
    }

    if (position === componentList.length - 1) {
      return true
    } else {
      return false
    }
  },
  moveUp: (item: component) => {
    let list = store.state.componentList
    const newOrder = item.order - 1

    store.state.componentList = list.map(currItem => {
      if (currItem.id == item.id) {
        return { ...currItem, order: newOrder }
      }

      if (currItem.order === newOrder) {
        return { ...currItem, order: newOrder + 1 }
      }

      return currItem
    })

  },
  moveDown: (item: component) => {
    let list = store.state.componentList
    const newOrder = item.order + 1

    store.state.componentList = list.map(currItem => {
      if (currItem.id == item.id) {
        return { ...currItem, order: newOrder }
      }

      if (currItem.order === newOrder) {
        return { ...currItem, order: newOrder - 1 }
      }

      return currItem
    })

  },
  validateForm: (fields: any) => {
    let errors = <errors>{};
    console.log({ fields })
    if (!fields.template.subject) {
      errors.subject = "Subject Required";
    }
    return errors;
  },
  checkFilledComponent: () => {
    const filledComponent = store.state.componentList.find(component => component.value != "")
    if (filledComponent) return true;
    return false;
  },
  AddComponent: (newComponent: component) => {
    const refineComponent = {
      ...newComponent,
      id: Date.now(),
      order: store.state.orderTracker++,
    };
    const totalComponent = store.state.componentList.filter(
      (item) => item.name === refineComponent.name
    );
    if (refineComponent.name === "Image") {
      if (totalComponent.length < 1) {
        store.state.componentList.push(refineComponent);
        if (imageCounter === 1) {
          setDisabledState(newComponent.id, true)
          imageCounter++
        }
        setDisabledState(newComponent.id, true)
      }
    } else if (refineComponent.name === "Paragraph") {
      if (totalComponent.length <= 1) {
        paragraphCounter += 1
        store.state.componentList.push(refineComponent);
        if (paragraphCounter === 2) {
          setDisabledState(newComponent.id, true)
        }
      }
    } else if (refineComponent.name === "Text") {
      if (totalComponent.length <= 1) {
        textCounter += 1
        store.state.componentList.push(refineComponent);
        if (textCounter === 2) {
          setDisabledState(newComponent.id, true)
        }
      }
    }
  },
  FindComponent: (value: string) => {
    return store.state.componentList.filter((item) => item.name === value);
  },
  DeleteComponent: (item: component) => {
    const menuItem = store.state.componentTypes.find(element => element.name === item.name)
    if (item.name === "Paragraph") {
      paragraphCounter--
      if (menuItem) {
        setDisabledState(menuItem.id, false)
      }
    } else if (item.name === "Text") {
      textCounter--
      if (menuItem) {
        setDisabledState(menuItem.id, false)
      }
    } if (item.name === "Image") {
      imageCounter--
      if (menuItem) {
        setDisabledState(menuItem.id, false)
      }
    }
    const indexOfObject = store.state.componentList.findIndex((object) => {
      return object.id === item.id;
    });
    store.state.componentList.splice(indexOfObject, 1);
  },
  modifyComponentValue: (id: number, value: string) => {
    for (let i in store.state.componentList) {
      if (store.state.componentList[i].id == id) {
        store.state.componentList[i].value = escapeSingleQuotes(value);
        break;
      }
    }
  },
  SaveComponentProperty: (item: component) => {
    for (let i = 0; i < store.state.componentList.length; i++) {
      const currentComponent = store.state.componentList[i];

      if (currentComponent.id === item.id) {
        if (
          currentComponent.properties != undefined &&
          item.properties != undefined
        ) {
          store.state.componentList[i] = item;
        }
        break;
      }
    }
  },
  SaveConfig: (data: Config) => {
    store.state.configData = data;
  },
  FetchTemplateById: async (id: string | string[]) => {
    try {
      store.state.loadingTemplate = true
      const url =
        `${import.meta.env.VITE_API_URL}/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: myHeaders,
      });
      const data = await response.json();
      if (data) {
        store.state.loadingTemplate = false
        const transformedData = {
          ...data.data.template,
          data: JSON.parse(JSON.parse(data.data.template.data).replace(/'/g, '"')),
        };
        store.state.template = transformedData;
      }
    } catch (error) {
      store.state.loadingTemplate = false
      console.log(error)
    }
  },
  FetchAllTemplates: async () => {
    try {
      store.state.loadingTemplates = true
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(url, {
        method: "GET",
        headers: myHeaders,
      });
      const data = await response.json();
      if (data) {
        store.state.loadingTemplates = false
        const transformedData = data.data.templates.map((template: any) => {
          return {
            ...template,
            data: JSON.parse(JSON.parse(template.data).replace(/'/g, '"')),
          };
        });
        store.state.templates = transformedData;
      }
    } catch (error: any) {
      store.state.loadingTemplates = false
      triggerToast(error.message, 'error')
    }
  },
  SaveTemplate: async (tempData: SanitizedTemplateData) => {
    store.state.fieldErrors = store.validateForm(tempData);
    if (Object.keys(store.state.fieldErrors).length) {
      return;
    }
    store.state.componentList = <component[]>[]
    debugger;
    store.state.componentTypes = defaultComponentTypesUnTempered;
    store.state.configData = { ...defaultConfigData }
    emitEvent("resetData", "No")
    paragraphCounter = 0;
    textCounter = 0;
    imageCounter = 0;

    // try {
    //     store.state.creatingTemplate = true
    //     const url = import.meta.env.VITE_API_URL
    //     const response = await fetch(url, {
    //       method: "POST",
    //       headers: myHeaders,
    //       body: JSON.stringify({
    //         template: JSON.stringify(tempData)
    //     })
    //     });
    //     store.state.creatingTemplate = false
    //     if(response.ok) {
    //       triggerToast('Template created successfully', 'success');
    //       store.state.componentList = <component[]>[],
    //       store.state.componentTypes = defaultComponentTypes,
    //       store.state.configData = <Config>{}
    //     }

    // } catch (error:any) {
    //   triggerToast(error.message, 'error')
    //     store.state.creatingTemplate = false
    // }
  }
};

export const sortedComponentList = computed(() => {
  return store.state.componentList.sort(
    (a: component, b: component) => a.order - b.order
  );
});