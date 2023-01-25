import {PropsWithChildren, ReactNode, useEffect, useState} from "react";

const ClientOnly: React.FC<PropsWithChildren> = ({children, ...delegated}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
