import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import {
  CategoryForm,
  SliderForm,
  PageForm,
  SectionForm,
} from "../../components";

export const successMessage = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    progress: undefined,
  });
};

export const errorMessage = (message, colored = null) => {
  toast.error(message, {
    icon: () => (
      <div className="Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter">
        <svg
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          fill={colored ? "#fff" : "var(--toastify-icon-color-error)"}
        >
          <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z" />
        </svg>
      </div>
    ),
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: colored,
    progress: undefined,
  });
};

export const translateEnglishNumberToPersian = (number) => {
  if (number !== undefined) {
    number = number.toString();
    const find = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const replace = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    for (let i = 0; i < find.length; i++) {
      number = number.replace(new RegExp(find[i], "g"), replace[i]);
    }
    return number;
  }
};

export const componentChooser = ({ componentName }) => {
  switch (componentName) {
    case "SLIDER_FORM":
      return <SliderForm />;
    case "CATEGORY_FORM":
      return <CategoryForm />;
    case "PAGE_FORM":
      return <PageForm />;
    case "SECTION_FORM":
      return <SectionForm />;

    default:
      break;
  }
};

export const translateSectinType = (type) => {
  if (type !== undefined) {
    type = type.toString();
    const find = ["about", "posts", "services", "teams"];
    const replace = ["درباره ما", "پست ها", "خدمات", "مشتریان ما"];
    for (let i = 0; i < find.length; i++) {
      type = type.replace(new RegExp(find[i], "g"), replace[i]);
    }
    return type;
  }
};

export const encodeImageFileAsURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const reactValidator = () => {
  return new SimpleReactValidator({
    messages: {
      required: "پر کردن این فیلد الزامی می باشد",
      url: "یک آدرس اینترنتی معتبر وارد کنید",
      string: "باید از نوع رشته باشد",
    },
    element: (message) => (
      <>
        <div className="error-icon" />
        <div style={{ color: "red", marginTop: "0.5rem" }}>{message}</div>
      </>
    ),
  });
};

export const adminMenuItem = [
  { id: 1, name: "داشبورد", link: "./", icon: "mdi-desktop-mac-dashboard" },
  {
    id: 2,
    name: "بخش ها",
    link: "./sections",
    icon: "mdi-card-bulleted-outline",
  },
  {
    id: 3,
    name: "دسته بندی",
    link: "./categories",
    icon: "mdi-format-list-checks",
  },
  { id: 4, name: "اسلایدر", link: "./slider", icon: "mdi-image-album" },
  { id: 5, name: "صفحه", link: "./pages", icon: "mdi-text-long" },
  { id: 6, name: "بنر", link: "./advertising", icon: "mdi-advertisements" },
  {
    id: 7,
    name: "تنظیمات فوتر ",
    link: "./footer",
    icon: "mdi-page-layout-footer",
  },
  { id: 8, name: "حساب کاربری", link: "./profile", icon: "mdi-account-cog" },
];

export const textEditorOptions = {
  defaultStyle: "font-family: IRANSans; min-height: 300px",
  buttonList: [
    // default
    [
      "%992",
      [
        ["undo", "redo"],
        [
          ":p-More Paragraph-default.more_paragraph",
          "font",
          "fontSize",
          "formatBlock",
          "paragraphStyle",
          "blockquote",
        ],
        ["bold", "underline", "italic", "strike"],
        [
          ":t-More Text-default.more_text",
          "subscript",
          "superscript",
          "fontColor",
          "hiliteColor",
          "textStyle",
        ],
        ["removeFormat"],
        ["outdent", "indent"],
        ["align", "horizontalRule", "list", "lineHeight"],
        [
          "-right",
          ":i-More Misc-default.more_vertical",
          "showBlocks",
          "codeView",
        ],
        [
          "-right",
          ":r-More Rich-default.more_plus",
          "table",
          "link",
          "image",
          "video",
        ],
      ],
    ],
  ],
  colorList: [
    "#EE82EE",
    "#4B0082",
    "#0000FF",
    "#228B22",
    "#FFFF00",
    "#FFA500",
    "#FF0000",
  ],
  shortcutsHint: false,
  pasteTagsBlacklist: "span|br",
  tagsBlacklist:
    "br|div|pre|blockquote|ol|ul|li|hr|figure|figcaption|img|iframe|audio|video|table|thead|tbody|tr|th|td|a|var|ins|s|strike|del|sub|sup|code|svg|path",
};

export const sectionItems = ["about", "posts", "services", "teams"];

export const sectionChoosor = (query) => {
  switch (query) {
    case "about":
      return ["Image", "Description"];
    case "posts":
      return ["Category"];
    case "services":
      return ["Title", "Description", "ServiceItem"];
    case "teams":
      return ["Title", "CustomerItem"];
    default:
      return "";
  }
};

export const footerOptions = [
  { itemId: 1, title: "مدیریت بخش اول", formName: "sevicesLink" },
  { itemId: 2, title: "مدیریت بخش دوم", formName: "link" },
  { itemId: 3, title: "مدیریت بخش سوم", formName: "aboutUs" },
  { itemId: 4, title: "مدیریت بخش چهارم", formName: "phoneAndEmail" },
  {
    itemId: 5,
    title: "مدیریت بخش شبکه های اجتماعی",
    formName: "socialMedia",
  },
];
