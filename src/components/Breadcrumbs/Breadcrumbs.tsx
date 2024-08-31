import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

type Breadcrumb = {
  title: string;
  url: string;
};

export function Breadcrumbs(props: { breadcrumbs: Breadcrumb[]; linkLast?: boolean }) {
  const { breadcrumbs, linkLast = false } = props;
  const count = breadcrumbs.length;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          const last = index === count - 1;

          return last && !linkLast ? (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.url}>{breadcrumb.title}</BreadcrumbLink>
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
