import { computed, reactive } from "vue";
import 'vue-toast-notification/dist/theme-bootstrap.css'
import { useToast } from 'vue-toast-notification';

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

const myHeaders = {
  "Content-Type": "application/json",
  Authorization: "Bearer hgk1cacvuz64",
};

const toast = useToast();
const triggerToast = (message:string, type:string) => {
  toast.clear()
  toast.success(message, {
    position: "top-right",
    type: type
  });
}
export const store = {
  state: reactive({
    templates: <Template[]>[],
    template: <Template>{},
    loadingTemplates: false,
    loadingTemplate: false
  }),
  FetchTemplateById: async (id: string | string[]) => {
    try {
      store.state.loadingTemplate = true
      const url =
        `https://dev.helloapex.dev/notifications-http/templates/mail-templates/${id}`;
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
      const url =
        "https://dev.helloapex.dev/notifications-http/templates/mail-templates";
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
};



