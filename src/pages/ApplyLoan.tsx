
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Calculator, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ApplyLoan = () => {
  const [loading, setLoading] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  const [collateralType, setCollateralType] = useState("");
  const [duration, setDuration] = useState("");
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const navigate = useNavigate();

  const calculateRequirements = () => {
    const amount = parseFloat(loanAmount) || 0;
    const collateralRatio = 1.5; // 150% collateralization
    const interestRate = 8.5; // 8.5% annual
    const monthlyPayment = duration ? (amount * (1 + interestRate/100)) / parseInt(duration) : 0;
    
    // Mock crypto prices
    const cryptoPrices = {
      bitcoin: 42000,
      ethereum: 2500,
      usdc: 1,
      usdt: 1
    };
    
    const requiredCollateralUSD = (amount / 15800) * collateralRatio; // Assuming 1 USD = 15,800 IDR
    const requiredCollateralAmount = collateralType ? requiredCollateralUSD / cryptoPrices[collateralType as keyof typeof cryptoPrices] : 0;
    
    return {
      collateralRequiredUSD: requiredCollateralUSD,
      collateralRequiredAmount: requiredCollateralAmount,
      interestRate,
      monthlyPayment,
      collateralRatio
    };
  };

  const { collateralRequiredUSD, collateralRequiredAmount, interestRate, monthlyPayment, collateralRatio } = calculateRequirements();

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setApplicationSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  const proceedToDeposit = () => {
    // In a real app, you'd pass the loan application data
    navigate('/deposit-collateral', { 
      state: { 
        loanAmount, 
        collateralType, 
        requiredAmount: collateralRequiredAmount,
        applicationId: 'APP-' + Date.now()
      } 
    });
  };

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="pt-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Aplikasi Pinjaman Disetujui!</h2>
                <p className="text-muted-foreground mb-6">
                  Selamat! Aplikasi pinjaman Anda telah disetujui. Langkah selanjutnya adalah menyetorkan jaminan crypto.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="text-sm text-left space-y-2">
                    <div className="flex justify-between">
                      <span>Jumlah Pinjaman:</span>
                      <span className="font-medium">Rp {parseFloat(loanAmount).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jaminan Diperlukan:</span>
                      <span className="font-medium">
                        {collateralRequiredAmount.toFixed(6)} {collateralType?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nilai Jaminan:</span>
                      <span className="font-medium">~${collateralRequiredUSD.toLocaleString('en-US')}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 mb-4"
                  size="lg"
                  onClick={proceedToDeposit}
                >
                  Lanjut ke Deposit Jaminan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-sm text-muted-foreground">
                  IDRX akan dikirim ke wallet Anda setelah jaminan dikonfirmasi (5-15 menit)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Ajukan Pinjaman</h1>
            <p className="text-muted-foreground">Dapatkan IDRX dengan mudah menggunakan crypto sebagai jaminan</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Application Form */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Pinjaman</CardTitle>
                <CardDescription>Isi form berikut untuk mengajukan pinjaman</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading ? (
                  <SkeletonLoader type="form" />
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Jumlah Pinjaman (IDRX)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="50000000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">Minimum Rp 10,000,000</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="collateral">Jenis Jaminan</Label>
                      <Select value={collateralType} onValueChange={setCollateralType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis crypto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                          <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                          <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Jangka Waktu (Bulan)</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jangka waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 Bulan</SelectItem>
                          <SelectItem value="12">12 Bulan</SelectItem>
                          <SelectItem value="18">18 Bulan</SelectItem>
                          <SelectItem value="24">24 Bulan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900 mb-1">Persyaratan Jaminan</p>
                          <p className="text-blue-700">
                            Anda perlu menyetorkan crypto senilai {Math.round(collateralRatio * 100)}% dari jumlah pinjaman sebagai jaminan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Loan Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Ringkasan Pinjaman
                </CardTitle>
                <CardDescription>Perhitungan berdasarkan input Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Jumlah Pinjaman</span>
                    <span className="font-medium">
                      {loanAmount ? `Rp ${parseFloat(loanAmount).toLocaleString('id-ID')}` : '-'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Jaminan Diperlukan</span>
                    <span className="font-medium text-blue-600">
                      {collateralRequiredAmount > 0 && collateralType ? 
                        `${collateralRequiredAmount.toFixed(6)} ${collateralType.toUpperCase()}` : '-'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Nilai Jaminan (USD)</span>
                    <span className="font-medium">
                      {collateralRequiredUSD > 0 ? `~$${collateralRequiredUSD.toLocaleString('en-US')}` : '-'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Suku Bunga</span>
                    <span className="font-medium">{interestRate}% per tahun</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pembayaran Bulanan</span>
                    <span className="font-medium">
                      {monthlyPayment > 0 ? `Rp ${monthlyPayment.toLocaleString('id-ID')}` : '-'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Rasio Jaminan</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {Math.round(collateralRatio * 100)}% (Aman)
                    </Badge>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-green-900 mb-1">Persetujuan Cepat</p>
                        <p className="text-green-700">
                          Aplikasi akan diproses dalam 2-5 menit. Setelah disetujui, Anda akan diarahkan untuk menyetorkan jaminan.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!loanAmount || !collateralType || !duration || loading}
                  >
                    {loading ? "Memproses Aplikasi..." : "Ajukan Pinjaman"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Steps Guide */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Proses Pinjaman</CardTitle>
              <CardDescription>Langkah-langkah setelah Anda submit aplikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Review Aplikasi</h3>
                  <p className="text-sm text-muted-foreground">
                    Aplikasi direview dalam 2-5 menit
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-medium mb-2">Setorkan Jaminan</h3>
                  <p className="text-sm text-muted-foreground">
                    Transfer crypto ke alamat yang disediakan
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Konfirmasi Jaminan</h3>
                  <p className="text-sm text-muted-foreground">
                    Menunggu konfirmasi blockchain (5-15 menit)
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <h3 className="font-medium mb-2">Terima IDRX</h3>
                  <p className="text-sm text-muted-foreground">
                    IDRX dikirim ke wallet Anda
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApplyLoan;
