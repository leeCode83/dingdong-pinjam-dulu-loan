
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { AlertTriangle, TrendingUp, Wallet, CreditCard, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

const ManageLoans = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const loans = [
    {
      id: "LOAN-001",
      amount: 50000000,
      outstanding: 42000000,
      collateral: "0.15 BTC",
      collateralValue: 6300,
      healthFactor: 1.8,
      dueDate: "2024-07-15",
      status: "active",
      interestRate: 8.5
    },
    {
      id: "LOAN-002", 
      amount: 25000000,
      outstanding: 18000000,
      collateral: "0.6 ETH",
      collateralValue: 1200,
      healthFactor: 2.2,
      dueDate: "2024-08-20",
      status: "active",
      interestRate: 8.5
    }
  ];

  const getHealthFactorColor = (factor: number) => {
    if (factor >= 2.0) return "text-green-600";
    if (factor >= 1.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthFactorBadge = (factor: number) => {
    if (factor >= 2.0) return <Badge className="bg-green-100 text-green-800">Aman</Badge>;
    if (factor >= 1.5) return <Badge className="bg-yellow-100 text-yellow-800">Peringatan</Badge>;
    return <Badge className="bg-red-100 text-red-800">Bahaya</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kelola Pinjaman</h1>
          <p className="text-muted-foreground">Monitor dan kelola semua pinjaman aktif Anda</p>
        </div>

        {/* Loan Summary Cards */}
        {loading ? (
          <SkeletonLoader type="stats" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pinjaman</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 75,000,000</div>
                <p className="text-xs text-muted-foreground">2 pinjaman aktif</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sisa Hutang</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 60,000,000</div>
                <p className="text-xs text-muted-foreground">80% dari total pinjaman</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jaminan</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$7,500</div>
                <p className="text-xs text-muted-foreground">0.75 BTC + 0.6 ETH</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Health Factor</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">2.0</div>
                <p className="text-xs text-muted-foreground">Status aman</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Active Loans */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pinjaman Aktif</CardTitle>
            <CardDescription>Detail semua pinjaman yang sedang berjalan</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonLoader type="table" />
            ) : (
              <div className="space-y-6">
                {loans.map((loan) => (
                  <Card key={loan.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{loan.id}</h3>
                            {getHealthFactorBadge(loan.healthFactor)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Jumlah Pinjaman</p>
                              <p className="text-lg font-medium">Rp {loan.amount.toLocaleString('id-ID')}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Sisa Hutang</p>
                              <p className="text-lg font-medium">Rp {loan.outstanding.toLocaleString('id-ID')}</p>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Progress Pembayaran</span>
                              <span className="text-sm">{Math.round((1 - loan.outstanding/loan.amount) * 100)}%</span>
                            </div>
                            <Progress value={(1 - loan.outstanding/loan.amount) * 100} className="h-2" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Jaminan</p>
                              <p className="text-lg font-medium">{loan.collateral}</p>
                              <p className="text-sm text-muted-foreground">${loan.collateralValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Health Factor</p>
                              <p className={`text-lg font-medium ${getHealthFactorColor(loan.healthFactor)}`}>
                                {loan.healthFactor}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Suku Bunga</p>
                              <p className="text-lg font-medium">{loan.interestRate}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Jatuh Tempo</p>
                              <p className="text-lg font-medium">{new Date(loan.dueDate).toLocaleDateString('id-ID')}</p>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                              Bayar Cicilan
                            </Button>
                            <Button variant="outline" size="sm">
                              Tambah Jaminan
                            </Button>
                            <Button variant="outline" size="sm">
                              Detail
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Jadwal Pembayaran
            </CardTitle>
            <CardDescription>Pembayaran yang akan datang</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonLoader type="table" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pinjaman</TableHead>
                    <TableHead>Tanggal Jatuh Tempo</TableHead>
                    <TableHead>Jumlah Pembayaran</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">LOAN-001</TableCell>
                    <TableCell>15 Jul 2024</TableCell>
                    <TableCell>Rp 4,375,000</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800">Jatuh Tempo 5 Hari</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Bayar Sekarang
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">LOAN-002</TableCell>
                    <TableCell>20 Agu 2024</TableCell>
                    <TableCell>Rp 2,187,500</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Masih Lama</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Bayar Sekarang
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ManageLoans;
