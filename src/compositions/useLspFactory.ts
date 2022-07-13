import { ProfileDataForEncoding } from "@lukso/lsp-factory.js/build/main/src/lib/interfaces/lsp3-profile";
import {
  DeployedUniversalProfileContracts,
  LSPFactory,
} from "@lukso/lsp-factory.js";
import {
  ContractDeploymentOptions,
  ProfileDataBeforeUpload,
  ProfileDeploymentOptions,
} from "@lukso/lsp-factory.js-alpha";

import { UploadOptions } from "@lukso/lsp-factory.js/build/main/src/lib/interfaces/profile-upload-options";
import { debug } from "console";

let lspFactory: LSPFactory;

const getFactory = (): LSPFactory => {
  return lspFactory;
};

const deployUniversalProfile = async (
  profileDeploymentOptions: ProfileDeploymentOptions,
  contractDeploymentOptions?: ContractDeploymentOptions | undefined
): Promise<DeployedUniversalProfileContracts> => {
  return await lspFactory.UniversalProfile.deploy(
    profileDeploymentOptions,
    contractDeploymentOptions
  );
};

const uploadUniversalProfileMetaData = async (
  profileData: ProfileDataBeforeUpload,
  uploadOptions?: UploadOptions
): Promise<ProfileDataForEncoding> => {
  return await lspFactory.UniversalProfile.uploadProfileData(
    profileData,
    uploadOptions
  );
};

type LSPFactoryProps = {
  deployUniversalProfile: (
    profileDeploymentOptions: ProfileDeploymentOptions,
    contractDeploymentOptions?: ContractDeploymentOptions | undefined
  ) => Promise<DeployedUniversalProfileContracts>;
  uploadUniversalProfileMetaData: (
    profileData: ProfileDataBeforeUpload,
    uploadOptions?: UploadOptions
  ) => Promise<ProfileDataForEncoding>;
  getFactory: () => LSPFactory;
};

export function useLspFactory(): LSPFactoryProps {
  const hasExtension = !!window.ethereum;
  if (!hasExtension) {
    throw new Error("Extension not installed");
  }
  lspFactory = new LSPFactory(window.ethereum);

  return {
    deployUniversalProfile,
    uploadUniversalProfileMetaData,
    getFactory,
  };
}
