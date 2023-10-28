import { ISkeletonProps, Skeleton as NSkeleton } from "native-base";
import React from "react";

interface Props extends ISkeletonProps {}

const Skeleton: React.FC<Props> = ({ ...rest }) => {
  return <NSkeleton startColor="gray.100" borderRadius={5} {...rest} />;
};

export default Skeleton;
