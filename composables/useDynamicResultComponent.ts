import { defineAsyncComponent } from "vue";

export function useDynamicComponent(): {
  getComponent: (
    dataType: string,
  ) => Promise<Component | null> | undefined;
} {
  interface IComponentMap {
    [dataType: string]: string;
  }

  const components: IComponentMap = {
    description: "Description",
    rates: "Rates",
    program: "Program",
    place: "Place",
    gallery: "Gallery",
    // contact: "ContactForm"
  };

  const importedComponentPromise = shallowRef<Promise<Component | null>>();

  function getComponent(
    dataType: string,
  ): Promise<Component | null> | undefined {
    if (!importedComponentPromise.value) {
      const componentName = components[dataType];
      if (!componentName) {
        throw new Error(`Component not found for data type: ${dataType}`);
      }
      importedComponentPromise.value = defineAsyncComponent(async () => {
        const component = await import(`@/components/home/${componentName}.vue`);
        return component.default || component;
      });
    }

    return importedComponentPromise.value;
  }

  return {
    getComponent,
  };
}
