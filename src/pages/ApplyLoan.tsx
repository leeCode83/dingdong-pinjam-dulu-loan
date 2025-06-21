import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calculator, AlertCircle, CheckCircle, ArrowRight, Wallet, TrendingUp, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyLoan = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const navigate = useNavigate();

  const totalCollateralValueUSD = 12500;
  const maxLTV = 2/3;
  const usdToIdrRate = 15800;
  const maxLoanableUSD = totalCollateralValueUSD * maxLTV;
  const maxLoanableIDRX = maxLoanableUSD * usdToIdrRate;
  const isLoanAmountExceeded = parseFloat(loanAmount) > maxLoanableIDRX;

  const calculateRepayments = () => {
    const amount = parseFloat(loanAmount) || 0;
    const interestRate = 8.5;
    const monthlyPayment = duration ? (amount * (1 + interestRate/100)) / parseInt(duration) : 0;
    return { monthlyPayment };
  };
  
  const { monthlyPayment } = calculateRepayments();

  const tutorialSteps = [
    {
      title: "Langkah 1: Periksa Jaminan & Limit",
      description: "Lihat total jaminan yang Anda miliki dan batas maksimal pinjaman yang bisa diajukan. Semua dihitung otomatis untuk Anda di bagian atas formulir.",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Langkah+1"
    },
    {
      title: "Langkah 2: Isi Detail Pinjaman",
      description: "Masukkan jumlah pinjaman yang Anda inginkan (tidak melebihi batas maksimal) dan pilih jangka waktu pembayaran yang sesuai.",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Langkah+2"
    },
    {
      title: "Langkah 3: Tinjau Ringkasan",
      description: "Periksa kembali ringkasan pinjaman di sebelah kanan, termasuk estimasi cicilan bulanan Anda. Pastikan semuanya sudah benar.",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Langkah+3"
    },
    {
      title: "Langkah 4: Ajukan & Selesai!",
      description: "Klik tombol 'Ajukan Pinjaman'. Jika disetujui, dana akan langsung cair ke wallet Anda dalam beberapa menit. Mudah, kan?",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Langkah+4"
    }
  ];

  const handleSubmit = () => {
    if (isLoanAmountExceeded) return;
    setLoading(true);
    setTimeout(() => {
      setApplicationSubmitted(true);
      setLoading(false);
    }, 2000);
  };
  
  const proceedToDashboard = () => navigate('/dashboard');

  if (applicationSubmitted) {
    return (
        <div className="min-h-screen bg-background"><Navbar />
            <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="max-w-2xl mx-auto text-center">
                <Card>
                <CardContent className="pt-6">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Aplikasi Pinjaman Terkirim!</h2>
                    <p className="text-muted-foreground mb-6">Selamat! Aplikasi pinjaman Anda sedang diproses. Dana akan cair ke wallet Anda dalam 5-15 menit.</p>
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                    <div className="text-sm space-y-2">
                        <div className="flex justify-between"><span>Jumlah Pinjaman:</span><span className="font-medium">Rp {parseFloat(loanAmount).toLocaleString('id-ID')}</span></div>
                        <div className="flex justify-between"><span>Jangka Waktu:</span><span className="font-medium">{duration} Bulan</span></div>
                        <div className="flex justify-between"><span>Cicilan Bulanan:</span><span className="font-medium">Rp {monthlyPayment.toLocaleString('id-ID')}</span></div>
                    </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={proceedToDashboard}>Kembali ke Dashboard <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </CardContent>
                </Card>
            </div>
            </div><Footer />
        </div>
    );
  }

  return (
    <Dialog>
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8"><h1 className="text-3xl font-bold mb-2">Ajukan Pinjaman</h1><p className="text-muted-foreground">Dapatkan IDRX dengan mudah berdasarkan jaminan yang Anda miliki.</p></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Application Form */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Detail Pinjaman</CardTitle>
                      <CardDescription>Isi form berikut untuk mengajukan pinjaman.</CardDescription>
                    </div>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="flex-shrink-0">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Card className="bg-gray-50/50">
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex justify-between items-center text-sm"><span className="text-muted-foreground flex items-center"><Wallet className="w-4 h-4 mr-2"/>Total Jaminan Anda</span><span className="font-medium">${totalCollateralValueUSD.toLocaleString('en-US')}</span></div>
                      <div className="flex justify-between items-center text-sm"><span className="text-muted-foreground flex items-center"><TrendingUp className="w-4 h-4 mr-2"/>Maksimal Pinjaman</span><span className="font-medium text-green-600">Rp {maxLoanableIDRX.toLocaleString('id-ID')}</span></div>
                    </CardContent>
                  </Card>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah Pinjaman (IDRX)</Label>
                    <Input id="amount" type="number" placeholder="50000000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className={isLoanAmountExceeded ? "border-red-500 focus-visible:ring-red-500" : ""}/>
                    {isLoanAmountExceeded && (<Alert variant="destructive" className="mt-2 text-xs"><AlertCircle className="h-4 w-4" /><AlertDescription>Jumlah pinjaman melebihi batas maksimal.</AlertDescription></Alert>)}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Jangka Waktu (Bulan)</Label>
                    <Select value={duration} onValueChange={setDuration}><SelectTrigger><SelectValue placeholder="Pilih jangka waktu" /></SelectTrigger><SelectContent><SelectItem value="6">6 Bulan</SelectItem><SelectItem value="12">12 Bulan</SelectItem><SelectItem value="18">18 Bulan</SelectItem><SelectItem value="24">24 Bulan</SelectItem></SelectContent></Select>
                  </div>
                </CardContent>
              </Card>

              {/* Loan Summary */}
              <Card>
                <CardHeader><CardTitle className="flex items-center"><Calculator className="w-5 h-5 mr-2" />Ringkasan Pinjaman</CardTitle><CardDescription>Perhitungan berdasarkan input Anda.</CardDescription></CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center"><span className="text-muted-foreground">Jumlah Pinjaman</span><span className="font-medium">{loanAmount ? `Rp ${parseFloat(loanAmount).toLocaleString('id-ID')}` : '-'}</span></div>
                    <div className="flex justify-between items-center"><span className="text-muted-foreground">Jangka Waktu</span><span className="font-medium">{duration ? `${duration} Bulan` : '-'}</span></div>
                    <div className="flex justify-between items-center"><span className="text-muted-foreground">Suku Bunga</span><span className="font-medium">8.5% per tahun</span></div>
                    <div className="flex justify-between items-center text-lg"><span className="text-muted-foreground">Pembayaran Bulanan</span><span className="font-bold text-blue-600">{monthlyPayment > 0 ? `Rp ${monthlyPayment.toLocaleString('id-ID')}` : '-'}</span></div>
                    <div className="flex justify-between items-center"><span className="text-muted-foreground">LTV Setelah Pinjaman</span><Badge variant="outline">{loanAmount ? `${((parseFloat(loanAmount) / usdToIdrRate) / totalCollateralValueUSD * 100).toFixed(2)}%` : '0.00%'}</Badge></div>
                  </div>
                  <div className="border-t pt-4">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600" size="lg" onClick={handleSubmit} disabled={!loanAmount || !duration || loading || isLoanAmountExceeded}>{loading ? "Memproses Aplikasi..." : "Ajukan Pinjaman"}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cara Mengajukan Pinjaman</DialogTitle>
        </DialogHeader>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {tutorialSteps.map((step, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 flex-col space-y-4">
                      <img src={step.image} alt={step.title} className="rounded-lg mb-4 w-full" />
                      <h3 className="text-lg font-semibold text-center">{step.title}</h3>
                      <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyLoan;