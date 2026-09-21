export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ozoogkghptkomyzxlbvs.supabase.co'
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QpaRdEJhDoVi7O5WgWfXrA_xJvYfswu'

    let targetUrl = 'https://ozoogkghptkomyzxlbvs.supabase.co/storage/v1/object/public/portfolio-assets/S_M_Mehrab_Hossain_Jayeed_Resume_1789725548958.pdf'

    try {
      const settRes = await fetch(`${supabaseUrl}/rest/v1/portfolio_settings?select=resume_url&id=eq.general`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      })

      if (settRes.ok) {
        const data = await settRes.json()
        if (data && data[0]?.resume_url && data[0].resume_url !== '#' && data[0].resume_url !== '/resume') {
          targetUrl = data[0].resume_url
        }
      }
    } catch (dbErr) {
      console.warn('Failed to fetch latest resume_url from DB, falling back to default:', dbErr)
    }

    // Fetch the actual PDF bytes from the Supabase Storage object
    const pdfRes = await fetch(targetUrl)
    if (!pdfRes.ok) {
      return res.redirect(302, targetUrl)
    }

    const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer())

    // Serve the PDF directly on the custom domain without any redirect
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="S_M_Mehrab_Hossain_Jayeed_Resume.pdf"')
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=300')
    return res.status(200).send(pdfBuffer)
  } catch (error) {
    console.error('Error serving resume stream:', error)
    return res.redirect(302, '/SM_Mehrab_Hossain_Jayeed_Resume.pdf')
  }
}
