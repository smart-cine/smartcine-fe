import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection({ className }: { readonly className?: string }) {
  return (
    <Accordion collapsible type='single' className='w-full'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          Which theaters can I buy movie tickets on SmartCine?
        </AccordionTrigger>
        <AccordionContent>
          Currently you can book tickets at the cinema as well as view movie
          showtimes at the following theaters: CGV Cinemas, Lotte Cinema, Galaxy
          Cinema, BHD Star, Mega GS, Dcine, Cinestar. Book movie tickets now.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>
          What are the benefits of buying movie tickets on SmartCine?
        </AccordionTrigger>
        <AccordionContent>
          Fast and intuitive, no need to buy tickets directly at the theater.
          Save time and convenience. There are many promotions with extremely
          attractive ticket prices. Buy movie tickets now.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>
          Can I buy movie tickets with popcorn or drink?
        </AccordionTrigger>
        <AccordionContent>
          Currently, SmartCine supports buying popcorn at CGV Cinemas, Lotte
          Cinema, BHD Star, and Dcine theaters right after booking tickets. If
          you want to increase the size or change the flavor of popcorn, just go
          to the counter and pay the cashier. Purchased popcorn is not eligible
          for return or exchange.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-4'>
        <AccordionTrigger>
          Is buying movie tickets at SmartCine more expensive than buying
          directly at the theater?
        </AccordionTrigger>
        <AccordionContent>
          Movie ticket prices on MoMo Wallet do not charge additional service
          fees and are sold at the same price as at the theater, but there are
          always promotions on weekdays and weekends so that SmartCine-ers can
          buy tickets at a better price than when buying directly at the store.
          theater.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-5'>
        <AccordionTrigger>
          Can movie tickets be exchanged or canceled?{' '}
        </AccordionTrigger>
        <AccordionContent>
          Movie tickets when looking up movie showtimes at MoMo Wallet currently
          do not support exchange or cancellation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
