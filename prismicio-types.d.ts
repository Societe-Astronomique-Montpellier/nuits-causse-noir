// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type HomepageDocumentDataSlicesSlice = never;

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
  /**
   * Ouvrir le site field in *Homepage*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: homepage.enable_site
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  enable_site: prismic.BooleanField;

  /**
   * Titre field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Titre
   * - **API ID Path**: homepage.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Sous-titre field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Sous-titre
   * - **API ID Path**: homepage.subtitle
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  subtitle: prismic.KeyTextField;

  /**
   * Date de début field in *Homepage*
   *
   * - **Field Type**: Date
   * - **Placeholder**: Date de début
   * - **API ID Path**: homepage.date_start
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  date_start: prismic.DateField;

  /**
   * Date de fin field in *Homepage*
   *
   * - **Field Type**: Date
   * - **Placeholder**: Date de fin
   * - **API ID Path**: homepage.date_end
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  date_end: prismic.DateField;

  /**
   * Lien inscription field in *Homepage*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Lien d'inscription
   * - **API ID Path**: homepage.subscribe_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  subscribe_link: prismic.LinkField;

  /**
   * Liste des tarifs field in *Homepage*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.rates_list
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  rates_list: prismic.ContentRelationshipField<"rate">;

  /**
   * Lieu field in *Homepage*
   *
   * - **Field Type**: GeoPoint
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.place_event
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#geopoint
   */
  place_event: prismic.GeoPointField;

  /**
   * Slice Zone field in *Homepage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice> /**
   * Meta Title field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: homepage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: homepage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Homepage*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HomepageDocumentData>,
    "homepage",
    Lang
  >;

type RateDocumentDataSlicesSlice = never;

/**
 * Content for Tarif documents
 */
interface RateDocumentData {
  /**
   * Titre field in *Tarif*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Titre
   * - **API ID Path**: rate.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Image field in *Tarif*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: rate.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Description field in *Tarif*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Description
   * - **API ID Path**: rate.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  description: prismic.KeyTextField;

  /**
   * Prix (euro) field in *Tarif*
   *
   * - **Field Type**: Number
   * - **Placeholder**: Prix en euro
   * - **API ID Path**: rate.price
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#number
   */
  price: prismic.NumberField;

  /**
   * Camping field in *Tarif*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Camping
   * - **API ID Path**: rate.camping
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  camping: prismic.KeyTextField;

  /**
   * Slice Zone field in *Tarif*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: rate.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<RateDocumentDataSlicesSlice> /**
   * Meta Title field in *Tarif*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: rate.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Tarif*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: rate.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Tarif*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: rate.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Tarif document from Prismic
 *
 * - **API ID**: `rate`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type RateDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<RateDocumentData>, "rate", Lang>;

export type AllDocumentTypes = HomepageDocument | RateDocument;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      HomepageDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      RateDocument,
      RateDocumentData,
      RateDocumentDataSlicesSlice,
      AllDocumentTypes,
    };
  }
}