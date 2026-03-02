"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosApi from "@/utils/axios";
import { CONTRACT, endPoints } from "@/utils/publicUrls";
import toast from "react-hot-toast";

const CONTRACT_ADDRESS =CONTRACT

const CONTRACT_ABI = [
  "function generateCertificate(string,string,string,string,string)",
  "function getCertificate(string) view returns (string,string,string,string)",
  "function isVerified(string) view returns (bool)"
];


const Page = () => {
  const [form, setForm] = useState({
    studentRegNo: "",
    course: "",
  });

  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const issueCertificate = async () => {
    try {
      setLoading(true);

      if (!certificateFile) {
        alert("Please upload certificate file");
        return;
      }

      /* =========================
         1️⃣ FIRST BACKEND CALL (FormData)
      ========================== */
      const formData = new FormData();
      formData.append("studentId", form.studentRegNo.toLowerCase());
      formData.append("courseName", form.course.toLowerCase());
      formData.append("certificate", certificateFile);

      const initRes = await axiosApi({
          ...endPoints.institute.certificates.issue,
          data:formData
      });
      // console.log(initRes)
      const { id,studentId, ipfsHash,instituteId} = initRes?.data?.data
      // console.log(studentId, ipfsHash,instituteId)
      /* =========================
         2️⃣ METAMASK + BLOCKCHAIN
      ========================== */
      if (!(window as any).ethereum) {
        alert("MetaMask not installed");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      console.log(3)
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer,
      );

      const tx = await contract.generateCertificate(id,studentId,form.course,instituteId,ipfsHash);
      const receipt = await tx.wait();
      console.log(receipt.blockHash)
      /* =========================
         3️⃣ FINAL BACKEND CONFIRM
      ========================== */
       const resp = await axiosApi({
          ...endPoints.institute.certificates.putIssue,
          data:{
            id,
            tranxId:receipt.blockHash
          }
      });

      toast.success("Certificate issued successfully 🎉");

      setForm({
        studentRegNo: "",
        course: "",
      });
      setCertificateFile(null);
    } catch (error:any) {
      console.log(error);
      toast.error(error?.response?.data?.message ||"Failed to issue certificate");
    } finally {
      setLoading(false);
    }
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCertificateFile(file);
    setLoading(true);

    try {
      // const formData = new FormData();
      // formData.append("file", file);

      // const res = await fetch("/api/uploadfile", {
      //   method: "POST",
      //   body: formData,
      // });

      // const data = await res.json();
      // console.log(data)
      // if (!res.ok) throw new Error("Upload failed");

      // // 👇 Store IPFS Hash inside certificateId
      // setForm((prev) => ({
      //   ...prev,
      //   certificateId: data.cid,
      // }));

      toast.success("File uploaded to IPFS successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3  mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Issue Student Certificate</h1>

      <Card className="p-6 space-y-6">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* <div>
            <Label>Certificate ID</Label>
            <Input
              name="certificateId"
              value={form.certificateId}
              onChange={handleChange}
              placeholder="CERT-001"
            />
          </div> */}

          <div>
            <Label>Student Registration No</Label>
            <Input
              name="studentRegNo"
              value={form.studentRegNo}
              onChange={handleChange}
              placeholder="REG-2025-041"
            />
          </div>

          {/* <div>
            <Label>Student Name</Label>
            <Input
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div> */}

          {/* <div>
            <Label>Student Email</Label>
            <Input
              name="studentEmail"
              value={form.studentEmail}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div> */}

          <div>
            <Label>Course / Program</Label>
            <Input
              name="course"
              value={form.course}
              onChange={handleChange}
              placeholder="Blockchain Development"
            />
          </div>

          {/* <div>
            <Label>Issue Date</Label>
            <Input
              type="date"
              name="issueDate"
              value={form.issueDate}
              onChange={handleChange}
            />
          </div> */}
        </div>

        {/* Upload Certificate */}
        <div>
          <Label>Upload Certificate (PDF / Image)</Label>
          <Input
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileUpload}
          />
          {certificateFile && (
            <p className="text-sm text-muted-foreground mt-1">
              Selected: {certificateFile.name}
            </p>
          )}
        </div>

        <Button
          onClick={issueCertificate}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Issuing Certificate..." : "Issue Certificate"}
        </Button>
      </Card>
    </div>
  );
};

export default Page;
