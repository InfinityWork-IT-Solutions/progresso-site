import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  ArrowRight, 
  BarChart3, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileText, 
  LayoutDashboard, 
  Menu, 
  TrendingUp, 
  Users, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Form Schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().optional(),
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Discovery Call Requested",
      description: "We'll be in touch shortly to schedule your session.",
    });
    form.reset();
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="Progreso Consultants" className="h-12 w-auto mix-blend-multiply" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">About Us</button>
            <button onClick={() => scrollToSection('solutions')} className="text-sm font-medium hover:text-primary transition-colors">Solutions</button>
            <button onClick={() => scrollToSection('why-us')} className="text-sm font-medium hover:text-primary transition-colors">Why Us</button>
            <Button onClick={() => scrollToSection('contact')}>Book Discovery Call</Button>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 flex flex-col gap-4 shadow-lg absolute w-full">
            <button onClick={() => scrollToSection('about')} className="text-left font-medium py-2">About Us</button>
            <button onClick={() => scrollToSection('solutions')} className="text-left font-medium py-2">Solutions</button>
            <button onClick={() => scrollToSection('why-us')} className="text-left font-medium py-2">Why Us</button>
            <Button onClick={() => scrollToSection('contact')} className="w-full">Book Discovery Call</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-50"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 uppercase tracking-wider">
              We are For The SMMEs
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 font-heading">
              The Engine of the Economy
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-slate-600 max-w-[800px]">
              Building the Backbone of South Africa’s Economy. We turn survivalist enterprises into sustainable assets through fixed-cost, high-impact strategy.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-12 px-8 text-lg" onClick={() => scrollToSection('contact')}>
                Start Growing Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg" onClick={() => scrollToSection('solutions')}>
                View Our Solutions
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Identity Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading mb-4">Our Core Identity</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We don't accept the statistic that 80% of businesses MUST fail.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                content: "To open access to elite managerial capital for South Africa's \"Missing Middle,\" transforming small businesses into intergenerational assets.",
                icon: <TrendingUp className="h-8 w-8 text-primary" />
              },
              {
                title: "Our Vision",
                content: "A South African economy anchored by a resilient, inclusive, and formalized SMME sector that serves as the primary engine for employment.",
                icon: <Users className="h-8 w-8 text-primary" />
              },
              {
                title: "Our Purpose",
                content: "We bridge the gap between entrepreneurial passion and operational proficiency. We provide the scaffolding for survival and the blueprint for scale.",
                icon: <Briefcase className="h-8 w-8 text-primary" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="mb-4 p-3 bg-blue-50 rounded-lg w-fit">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 font-heading">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 md:p-12 rounded-2xl border shadow-sm">
            <h3 className="text-2xl font-bold mb-6 font-heading">Our Values</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Pragmatism", desc: "Actionable systems over abstract theory." },
                { title: "Economic Dignity", desc: "Formalization as a path to financial access." },
                { title: "Systems Thinking", desc: "Building the machine, not just operating it." },
                { title: "Inclusive Excellence", desc: "High-level strategy for everyone, not just the elite." }
              ].map((val, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">{val.title}</h4>
                    <p className="text-slate-600">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">34%</div>
              <div className="text-primary-foreground/80 font-medium">GDP Contribution</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">60%</div>
              <div className="text-primary-foreground/80 font-medium">Labor Force Absorption</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">R900B</div>
              <div className="text-primary-foreground/80 font-medium">Township Economy Value</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">80%</div>
              <div className="text-primary-foreground/80 font-medium">Unregistered Businesses</div>
            </div>
          </div>
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-lg opacity-90">"Despite the headlines, the SMME sector is the true heartbeat of South Africa. You are not just a participant in the economy; you are the economy."</p>
          </div>
        </div>
      </section>

      {/* The Struggle & Competitors */}
      <section id="why-us" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading mb-6">The "Death Valley" Reality</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">70-80%</CardTitle>
                  <CardDescription>Failure Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  New entities collapse within their first five years.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">35%</CardTitle>
                  <CardDescription>The Product Trap</CardDescription>
                </CardHeader>
                <CardContent>
                  Startups fail simply because they built a product nobody wanted.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Gap</CardTitle>
                  <CardDescription>Execution Gap</CardDescription>
                </CardHeader>
                <CardContent>
                  Lack of "Managerial Capital" - systems required to survive cash flow crunches.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-heading">Why Help Hasn't Helped</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-100">
                    <th className="text-left p-4 font-bold text-slate-900">Competitor Type</th>
                    <th className="text-left p-4 font-bold text-slate-900">Why They Often Miss the Mark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="p-4 font-medium">Public Sector</td>
                    <td className="p-4 text-slate-600">Bureaucracy: Funding delays, focus on compliance rather than survival.</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="p-4 font-medium">Private Incubators</td>
                    <td className="p-4 text-slate-600">Equity Demands: Highly exclusive, requires giving up shares/ownership.</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="p-4 font-medium">Corporate Consultancies</td>
                    <td className="p-4 text-slate-600">High Cost: Aimed at established businesses (&gt;R15m), inaccessible fee structures.</td>
                  </tr>
                  <tr className="bg-blue-50/50 border-l-4 border-primary">
                    <td className="p-4 font-bold text-primary">The Progreso Difference</td>
                    <td className="p-4 font-medium text-slate-900">
                      Corporate-level strategy with a Fixed Cost, Fixed Time model. No equity grab, no red tape.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">Our Solutions</h2>
            <p className="text-slate-600">We offer strategic rigor with a Fixed Cost, Fixed Time model.</p>
          </div>

          <Tabs defaultValue="startups" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4 bg-transparent p-0 mb-8">
              <TabsTrigger value="startups" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white p-4 h-auto flex flex-col items-center gap-2">
                <span className="font-bold text-lg">Start-Ups</span>
                <span className="text-xs opacity-80 font-normal">0-2 Years</span>
              </TabsTrigger>
              <TabsTrigger value="scaling" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white p-4 h-auto flex flex-col items-center gap-2">
                <span className="font-bold text-lg">Established SMMEs</span>
                <span className="text-xs opacity-80 font-normal">Scaling Phase</span>
              </TabsTrigger>
              <TabsTrigger value="retainers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white p-4 h-auto flex flex-col items-center gap-2">
                <span className="font-bold text-lg">Retainers</span>
                <span className="text-xs opacity-80 font-normal">Continuous Support</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="startups" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Viability Navigator",
                    price: "R3,000",
                    time: "3 Days",
                    problem: "Fear of wasting capital on an idea people don't want.",
                    roi: "Saves months of effort and prevents 100% capital loss."
                  },
                  {
                    name: "Define Your Purpose",
                    price: "R5,000",
                    time: "5 Days",
                    problem: "Need for verifiable financial proof for investors/banks.",
                    roi: "90% reduction in consulting fees compared to traditional analysis."
                  },
                  {
                    name: "Strategy Foundation",
                    price: "R9,000",
                    time: "8 Days",
                    problem: "Internal friction and lack of direction.",
                    roi: "Creates a non-negotiable standard for all decisions."
                  }
                ].map((item, i) => (
                  <Card key={i} className="flex flex-col">
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-bold text-primary">{item.price}</span>
                        <span className="text-sm text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> {item.time}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-900 mb-1">Problem:</div>
                        <p className="text-sm text-slate-600">{item.problem}</p>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 mb-1">Promise (ROI):</div>
                        <p className="text-sm text-slate-600">{item.roi}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline" onClick={() => scrollToSection('contact')}>Inquire Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scaling" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                  {
                    name: "Product Profit Audit",
                    price: "R12,000",
                    time: "4 Days",
                    problem: "Inability to identify profitable products.",
                    roi: "Boosts profit margins, saves 15-30% ad spend."
                  },
                  {
                    name: "Profit Accelerator",
                    price: "R20,000",
                    time: "7 Days",
                    problem: "Thin margins caused by operational waste.",
                    roi: "Guaranteed 4x ROI within six months."
                  },
                  {
                    name: "Strategies & Tactics",
                    price: "R30,000",
                    time: "19 Days",
                    problem: "\"Lazy Vision\" - goals not executed.",
                    roi: "Increases manager productivity by 5-10 hrs/week."
                  },
                  {
                    name: "New Opp. Assessment",
                    price: "R45,000",
                    time: "20 Days",
                    problem: "High risk of launching new products blindly.",
                    roi: "Saves up to R500,000 in potential losses."
                  }
                ].map((item, i) => (
                  <Card key={i} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <div className="flex flex-col mt-2">
                        <span className="text-xl font-bold text-primary">{item.price}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> {item.time}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-slate-900 mb-1">Problem:</div>
                        <p className="text-xs text-slate-600">{item.problem}</p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 mb-1">Promise (ROI):</div>
                        <p className="text-xs text-slate-600">{item.roi}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline" size="sm" onClick={() => scrollToSection('contact')}>Inquire</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="retainers" className="space-y-6">
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                  {
                    name: "Founder's Pulse Check",
                    price: "R1,500/mo",
                    time: "1 hr",
                    service: "Basic Goal Tracking & Accountability."
                  },
                  {
                    name: "The Strategic Monitor",
                    price: "R4,500/mo",
                    time: "3 hrs",
                    service: "Monthly Market Intelligence Digest."
                  },
                  {
                    name: "Velocity Retainer",
                    price: "R7,500/mo",
                    time: "5 hrs",
                    service: "Weekly Implementation Support."
                  },
                  {
                    name: "On-Demand Strategist",
                    price: "R24,000/mo",
                    time: "16 hrs",
                    service: "Fractional Head of Strategy."
                  }
                ].map((item, i) => (
                  <Card key={i} className="flex flex-col border-primary/20 bg-blue-50/30">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <div className="flex flex-col mt-2">
                        <span className="text-xl font-bold text-primary">{item.price}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> {item.time}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-slate-700">{item.service}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => scrollToSection('contact')}>Select Plan</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold font-heading mb-6">Ready to Defy the Odds?</h2>
              <p className="text-xl text-slate-600 mb-8">
                Stop Guessing. Start Growing. You don't need another generic workshop. You need a battle plan.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full text-primary">
                    <LayoutDashboard className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Fixed Cost Solutions</h3>
                    <p className="text-slate-600">Know exactly what you pay and what you get.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Actionable Reports</h3>
                    <p className="text-slate-600">Walk away with a report you can use immediately.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-slate-50 rounded-lg border">
                <h4 className="font-semibold mb-4">Contact Details</h4>
                <div className="space-y-2 text-slate-600">
                  <p>Email: jody@progreso.consulting</p>
                  <p>Phone: 078 584 3558</p>
                  <p>Address: South Africa Wide</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border">
              <h3 className="text-2xl font-bold mb-2">Book Your Free Discovery Call</h3>
              <p className="text-slate-500 mb-6">We have limited capacity for new retainer clients. Secure your strategic advantage now.</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="072 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How can we help? (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your business challenges..." className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full text-lg h-12">Submit Request</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Progreso" className="h-10 w-auto brightness-0 invert" />
              </div>
              <p className="text-sm opacity-80 max-w-xs">
                Transforming small businesses into intergenerational assets through systems-driven consultancy.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors">Start-Ups</button></li>
                <li><button onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors">Established SMMEs</button></li>
                <li><button onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors">Retainers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>jody@progreso.consulting</li>
                <li>078 584 3558</li>
                <li>South Africa Wide</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs opacity-60">
            © {new Date().getFullYear()} Progreso Consultants. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
