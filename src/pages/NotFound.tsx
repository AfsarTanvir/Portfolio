import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '../components/ui/SmartLink';
import { stagger } from '../lib/utils';

export function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p data-animate className="eyebrow">
          404
        </p>
        <h1 data-animate style={stagger(1)} className="mt-4 display text-6xl sm:text-8xl">
          Page not found
        </h1>
        <p data-animate style={stagger(2)} className="mx-auto mt-5 max-w-md text-muted">
          This page may have been moved, or the link may contain a typo.
        </p>
        <div data-animate style={stagger(3)} className="mt-8 flex justify-center">
          <ButtonLink href="/">
            <ArrowLeft size={16} /> Back to the home page
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
