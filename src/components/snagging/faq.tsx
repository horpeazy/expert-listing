import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What is a snagging inspection?",
      answer: "A snagging inspection is a detailed examination of a newly built property to identify defects, incomplete work, or issues with construction quality before you move in. It ensures everything meets the standards you paid for."
    },
    {
      question: "Who conducts the inspection?",
      answer: "Our inspections are conducted by qualified professionals including structural engineers, architects, and experienced building inspectors with years of experience in Nigerian construction standards."
    },
    {
      question: "What kinds of issues are usually identified?",
      answer: "Common issues include wall cracks and poor plastering, misaligned doors or windows, leaky pipes or faulty plumbing, uneven flooring or tiles, electrical issues, unfinished paintwork, and incomplete fittings."
    },
    {
      question: "How long does the inspection take?",
      answer: "Inspection duration depends on the package and property size. Basic inspections typically take 2-4 hours, Standard takes 4-6 hours, and Premium can take a full day or more for comprehensive assessment."
    },
    {
      question: "Can I book an inspection if I haven't moved in yet?",
      answer: "Yes! In fact, it's best to book a snagging inspection before you move in. This allows you to identify and report issues to the developer while you're still within warranty periods."
    },
    {
      question: "What happens after the inspection?",
      answer: "You'll receive a detailed report with photos and descriptions of all identified issues, along with recommendations for fixes. You can then present this to your developer or contractor for remediation."
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

