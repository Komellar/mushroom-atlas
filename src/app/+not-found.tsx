import { ActionLink } from '@/components/action-link';
import { Page } from '@/components/page';
import { pl } from '@/locales/pl';

export default function NotFoundScreen() {
  return (
    <Page title={pl.notFound.title} description={pl.notFound.description}>
      <ActionLink href="/" label={pl.notFound.action} replace />
    </Page>
  );
}
