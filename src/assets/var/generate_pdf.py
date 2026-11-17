import os
import sys
from fpdf import FPDF

class CitoPDF(FPDF):
    def __init__(self):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.set_auto_page_break(auto=True, margin=18)
        
        # Load system Arial fonts
        self.add_font("ArialCustom", "", r"C:\Windows\Fonts\arial.ttf")
        self.add_font("ArialCustom", "B", r"C:\Windows\Fonts\arialbd.ttf")
        self.add_font("ArialCustom", "I", r"C:\Windows\Fonts\ariali.ttf")
        self.add_font("ArialCustom", "BI", r"C:\Windows\Fonts\arialbi.ttf")

    def header(self):
        if self.page_no() == 1:
            return  # No header on cover page
        self.set_font("ArialCustom", "B", 8)
        self.set_text_color(100, 116, 139)
        self.cell(0, 6, "CITOINDAGAR 360  |  DOCUMENTACIÓN TÉCNICA Y PEDAGÓGICA", align="L")
        self.set_font("ArialCustom", "", 8)
        self.cell(0, 6, "5.° Primaria — MERN + Three.js", align="R", new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(226, 232, 240)
        self.set_line_width(0.3)
        self.line(15, self.get_y(), 195, self.get_y())
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_draw_color(226, 232, 240)
        self.set_line_width(0.3)
        self.line(15, self.get_y(), 195, self.get_y())
        self.ln(2)
        self.set_font("ArialCustom", "", 8)
        self.set_text_color(148, 163, 184)
        self.cell(0, 8, "CitoIndagar 360 — Laboratorio Digital Inmersivo", align="L")
        self.cell(0, 8, f"Página {self.page_no()} de {{nb}}", align="R")

    def section_title(self, num, title, subtitle=None):
        self.ln(4)
        self.set_font("ArialCustom", "B", 14)
        self.set_text_color(15, 23, 42)
        self.cell(0, 7, f"{num}. {title}", new_x="LMARGIN", new_y="NEXT")
        if subtitle:
            self.set_font("ArialCustom", "I", 9)
            self.set_text_color(100, 116, 139)
            self.cell(0, 5, subtitle, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(14, 165, 233)
        self.set_line_width(0.8)
        self.line(15, self.get_y() + 1, 60, self.get_y() + 1)
        self.ln(4)

    def subsection_title(self, title):
        self.ln(2)
        self.set_font("ArialCustom", "B", 11)
        self.set_text_color(2, 132, 199)
        self.cell(0, 6, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def paragraph(self, text):
        self.set_font("ArialCustom", "", 9.5)
        self.set_text_color(51, 65, 85)
        self.multi_cell(0, 5, text)
        self.ln(2)

    def tip_box(self, title, text, r=240, g=249, b=255, br=186, bg=230, bb=253):
        self.ln(1)
        self.set_fill_color(r, g, b)
        self.set_draw_color(br, bg, bb)
        self.set_line_width(0.4)
        x = self.get_x()
        y = self.get_y()
        self.set_font("ArialCustom", "B", 9)
        self.set_text_color(3, 105, 161)
        # Calculate height
        self.set_font("ArialCustom", "", 8.5)
        # Use rect
        lines = len(text) // 80 + 2
        h = max(16, lines * 4.5 + 8)
        self.rect(15, y, 180, h, style="FD")
        self.set_xy(18, y + 2)
        self.set_font("ArialCustom", "B", 9)
        self.cell(174, 5, title, new_x="LMARGIN", new_y="NEXT")
        self.set_x(18)
        self.set_font("ArialCustom", "", 8.5)
        self.set_text_color(15, 23, 42)
        self.multi_cell(174, 4.2, text)
        self.set_y(y + h + 3)

def build_pdf(output_path):
    pdf = CitoPDF()
    pdf.alias_nb_pages()
    pdf.set_margins(15, 15, 15)

    # ================= PAGE 1: COVER =================
    pdf.add_page()
    pdf.ln(15)

    # Decorative header tag
    pdf.set_fill_color(224, 242, 254)
    pdf.set_text_color(2, 132, 199)
    pdf.set_font("ArialCustom", "B", 9)
    pdf.cell(50, 7, "  GUÍA TÉCNICA Y OPERATIVA  ", align="C", fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)

    # Main Title
    pdf.set_font("ArialCustom", "B", 26)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 11, "CitoIndagar 360", new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("ArialCustom", "B", 14)
    pdf.set_text_color(14, 165, 233)
    pdf.cell(0, 8, "Manual Maestro: Modelos 3D, Accesos de Usuarios y Mapa del Sitio", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)

    pdf.set_draw_color(14, 165, 233)
    pdf.set_line_width(1.2)
    pdf.line(15, pdf.get_y(), 195, pdf.get_y())
    pdf.ln(6)

    # Metadata card
    pdf.set_fill_color(248, 250, 252)
    pdf.set_draw_color(226, 232, 240)
    pdf.rect(15, pdf.get_y(), 180, 32, style="FD")
    y_card = pdf.get_y() + 3
    pdf.set_xy(18, y_card)
    pdf.set_font("ArialCustom", "B", 9)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(40, 5, "Nivel Educativo:")
    pdf.set_font("ArialCustom", "", 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(130, 5, "5.º de Primaria — Ciencias Naturales (La Célula)", new_x="LMARGIN", new_y="NEXT")

    pdf.set_x(18)
    pdf.set_font("ArialCustom", "B", 9)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(40, 5, "Arquitectura:")
    pdf.set_font("ArialCustom", "", 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(130, 5, "MERN (React 19 + Node.js/Express 5 + MongoDB Atlas) + Three.js / R3F", new_x="LMARGIN", new_y="NEXT")

    pdf.set_x(18)
    pdf.set_font("ArialCustom", "B", 9)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(40, 5, "Referente de Interacción:")
    pdf.set_font("ArialCustom", "", 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(130, 5, "Laboratorio Navegable del Sistema Circulatorio (controles por mallas, sliders, capas)", new_x="LMARGIN", new_y="NEXT")

    pdf.set_x(18)
    pdf.set_font("ArialCustom", "B", 9)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(40, 5, "Fecha de Emisión:")
    pdf.set_font("ArialCustom", "", 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(130, 5, "Noviembre de 2026  |  Versión 1.0 Final", new_x="LMARGIN", new_y="NEXT")

    pdf.set_y(y_card + 35)

    # Executive Summary
    pdf.set_font("ArialCustom", "B", 12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 6, "Resumen del Documento", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)
    pdf.paragraph(
        "Este documento consolida las especificaciones esenciales para la puesta en marcha integral de la plataforma web CitoIndagar 360. "
        "Reúne los accesos oficiales para los tres roles de usuario (Estudiante, Docente y Administrador), el mapa de arquitectura y navegación "
        "de la aplicación, el inventario técnico de los modelos 3D que deben ser suministrados según la regla pedagógica 1-1-1-1 y las pautas "
        "de despliegue en la nube (Render y Vercel)."
    )

    # Table of Contents box
    pdf.ln(2)
    pdf.set_fill_color(241, 245, 249)
    pdf.set_draw_color(203, 213, 225)
    pdf.rect(15, pdf.get_y(), 180, 48, style="FD")
    y_toc = pdf.get_y() + 3
    pdf.set_xy(18, y_toc)
    pdf.set_font("ArialCustom", "B", 10)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 6, "Tabla de Contenido:", new_x="LMARGIN", new_y="NEXT")
    
    sections = [
        ("Sección 1", "Credenciales y Accesos Oficiales del Sistema (Estudiante, Docente, Admin)", "Pág. 2"),
        ("Sección 2", "Mapa del Sitio y Estructura Jerárquica de la Aplicación Web", "Pág. 2"),
        ("Sección 3", "Inventario y Requerimientos de Modelos 3D (Patrón Sistema Circulatorio)", "Pág. 3"),
        ("Sección 4", "Jerarquía de Nodos en Blender, Convenciones y Presupuesto de Rendimiento", "Pág. 4"),
        ("Sección 5", "Variables de Entorno y Configuración de Despliegue (Render y Vercel)", "Pág. 4")
    ]
    for tag, desc, page in sections:
        pdf.set_x(18)
        pdf.set_font("ArialCustom", "B", 8.5)
        pdf.set_text_color(2, 132, 199)
        pdf.cell(22, 5, tag)
        pdf.set_font("ArialCustom", "", 8.5)
        pdf.set_text_color(51, 65, 85)
        pdf.cell(125, 5, desc)
        pdf.set_font("ArialCustom", "I", 8.5)
        pdf.set_text_color(148, 163, 184)
        pdf.cell(25, 5, page, align="R", new_x="LMARGIN", new_y="NEXT")

    # ================= PAGE 2: ACCESOS Y MAPA DEL SITIO =================
    pdf.add_page()
    pdf.section_title("1", "Credenciales y Accesos Oficiales del Sistema", "Cuentas de demostración precargadas en base de datos para pruebas y validación")

    pdf.paragraph(
        "El sistema cuenta con tres roles diferenciados con políticas estrictas de autenticación mediante JWT y cookies HttpOnly. "
        "A continuación se detallan las credenciales sembradas en la base de datos:"
    )

    # Table of Users
    headers = [("Rol", 25), ("Usuario", 30), ("Contraseña", 32), ("Nombre / Muestra", 45), ("Aula Asignada", 48)]
    pdf.set_fill_color(15, 23, 42)
    pdf.set_draw_color(15, 23, 42)
    pdf.set_font("ArialCustom", "B", 8.5)
    pdf.set_text_color(255, 255, 255)
    for h, w in headers:
        pdf.cell(w, 7, h, border=1, fill=True, align="C")
    pdf.ln()

    users_data = [
        ("Estudiante", "estudiante01", "Cito2026*", "Sofía Rojas", "CITO5A (5.° A Primaria)"),
        ("Estudiante", "estudiante02", "Cito2026*", "Mateo García", "CITO5A (5.° A Primaria)"),
        ("Docente", "docente01", "Docente2026*", "Profe Camila Torres", "CITO5A (Docente a cargo)"),
        ("Admin", "admin", "Admin2026*", "Administrador General", "Acceso global del sistema")
    ]
    fill = False
    for rol, u, p, n, a in users_data:
        pdf.set_fill_color(248, 250, 252) if fill else pdf.set_fill_color(255, 255, 255)
        pdf.set_font("ArialCustom", "B", 8)
        pdf.set_text_color(2, 132, 199) if rol == "Estudiante" else pdf.set_text_color(16, 185, 129) if rol == "Docente" else pdf.set_text_color(168, 85, 247)
        pdf.cell(25, 6.5, rol, border=1, fill=True)
        pdf.set_font("ArialCustom", "B", 8)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(30, 6.5, u, border=1, fill=True)
        pdf.set_font("ArialCustom", "", 8)
        pdf.set_text_color(225, 29, 72)
        pdf.cell(32, 6.5, p, border=1, fill=True)
        pdf.set_text_color(51, 65, 85)
        pdf.cell(45, 6.5, n, border=1, fill=True)
        pdf.cell(48, 6.5, a, border=1, fill=True)
        pdf.ln()
        fill = not fill

    pdf.ln(1)
    pdf.paragraph(
        "Nota: Existen además 6 estudiantes demo adicionales (estudiante03 a estudiante08) con la misma contraseña Cito2026*, "
        "los cuales permiten simular aulas completas con evidencias enviadas, estados de aprobación y notas en escala MEN."
    )

    # Section 2: Site Map
    pdf.section_title("2", "Mapa del Sitio y Estructura de Navegación", "Rutas y funcionalidades organizadas por nivel de acceso en la SPA (React Router)")

    sitemap_items = [
        ("ZONA PÚBLICA", [
            ("/", "Landing Page", "Presentación interactiva, narrativa de Cito, objetivos pedagógicos y llamado a la acción."),
            ("/login", "Inicio de Sesión", "Autenticación segura con JWT, selección de rol y redirección inteligente.")
        ]),
        ("PORTAL ESTUDIANTE (Rol 'student')", [
            ("/estudiante", "Mapa de Misiones", "Tablero principal con las 3 misiones (M1, M2, M3), progreso, XP acumulado e insignia conquistada."),
            ("/misiones/:codigo", "Estación de Misión", "Detalle de la misión estructurado en tres fases pedagógicas: Inicio, Desarrollo y Cierre."),
            ("/misiones/:codigo/actividades/:id", "Reproductor de Actividad", "Ejecutor de experiencias: Visor 3D, WebAR Merge Cube, Estación Quiver, Laboratorio de Ósmosis, Video 360 y Bitácora."),
            ("/misiones/:codigo/quiz", "Evaluación Formativa", "Quiz interactivo con calificación en servidor, retroalimentación inmediata por ítem y control de intentos."),
            ("/logros", "Gabinete de Logros", "Vitrina con las 5 insignias, progreso de nivel, bitácora de evidencias y retroalimentación del docente.")
        ]),
        ("PORTAL DOCENTE (Roles 'teacher' y 'admin')", [
            ("/docente", "Cockpit Docente", "Panel de control del aula CITO5A: KPIs, matriz de progreso en vivo y gestor de turnos para rotación de tabletas."),
            ("/docente/evidencias", "Revisión de Evidencias", "Bandeja de entregables con rúbrica oficial MEN (Superior, Alto, Básico, Bajo) y chips de retroalimentación."),
            ("/docente/reportes", "Sábana de Calificaciones", "Boletín consolidado del grupo, vista para impresión escolar y exportación de datos en formato CSV."),
            ("/docente/misiones", "Previsualización Curricular", "Inspección docente del mapa de misiones y recursos pedagógicos.")
        ]),
        ("PORTAL ADMINISTRADOR (Rol 'admin')", [
            ("/admin", "Consola de Administración", "Gestión integral de usuarios (creación, reseteo de claves), aulas y códigos de matrícula.")
        ])
    ]

    for group_title, routes in sitemap_items:
        pdf.set_font("ArialCustom", "B", 9.5)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(0, 5.5, f"• {group_title}", new_x="LMARGIN", new_y="NEXT")
        for path, name, desc in routes:
            pdf.set_x(20)
            pdf.set_font("ArialCustom", "B", 8)
            pdf.set_text_color(2, 132, 199)
            pdf.cell(50, 4.2, f"{path} ({name})")
            pdf.set_font("ArialCustom", "", 8)
            pdf.set_text_color(71, 85, 105)
            pdf.cell(120, 4.2, f"— {desc}", new_x="LMARGIN", new_y="NEXT")
        pdf.ln(1)

    # ================= PAGE 3: MODELOS 3D =================
    pdf.add_page()
    pdf.section_title("3", "Inventario Maestro de Modelos 3D Requeridos", "Activos digitales basados en la regla pedagógica 1-1-1-1 y el referente del Sistema Circulatorio")

    pdf.paragraph(
        "Tomando como referente el proyecto del Sistema Circulatorio, los modelos 3D en CitoIndagar 360 no son objetos estáticos: "
        "son laboratorios interactivos manipulables mediante React Three Fiber (R3F). A continuación se especifican los modelos necesarios:"
    )

    pdf.subsection_title("3.1 Modelos 3D Principales (Laboratorio Interactivo)")
    
    headers_m = [("Misión", 22), ("Nombre de Archivo", 42), ("Descripción del Modelo", 64), ("Interactividad R3F (Tipo Circulatorio)", 52)]
    pdf.set_fill_color(15, 23, 42)
    pdf.set_font("ArialCustom", "B", 8)
    pdf.set_text_color(255, 255, 255)
    for h, w in headers_m:
        pdf.cell(w, 7, h, border=1, fill=True, align="C")
    pdf.ln()

    models_main = [
        ("M1: Teoría", "microscopio_celula.glb", "Microscopio óptico escolar con platina, tubo óptico, revólver y placa con muestra celular.", "Zoom continuo 10x/40x/100x; hotspots en partes ópticas; revelado de postulados."),
        ("M2: Tipos", "celula_animal_kids.glb", "Célula animal esférica con corte transversal 3D que exhibe los organelos internos.", "Conmutador Animal/Vegetal; capas de membrana/citoplasma; vista desarmada (exploded)."),
        ("M2: Tipos", "celula_vegetal_kids.glb", "Célula vegetal poliédrica con corte transversal; incluye pared celular y gran vacuola.", "Comparación lado a lado; visibilidad de capas; hotspots en estructuras exclusivas."),
        ("M3: Energía", "celula_energia_kids.glb", "Célula vegetal funcional reactiva a variables metabólicas y balance hídrico.", "Slider de agua (0-100% turgencia/plasmólisis); slider de luz (emisión); slider de nutrientes (ATP).")
    ]
    fill = False
    for m, f, d, it in models_main:
        pdf.set_fill_color(248, 250, 252) if fill else pdf.set_fill_color(255, 255, 255)
        pdf.set_font("ArialCustom", "B", 7.5)
        pdf.set_text_color(2, 132, 199)
        pdf.cell(22, 9, m, border=1, fill=True)
        pdf.set_font("ArialCustom", "B", 7.5)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(42, 9, f, border=1, fill=True)
        pdf.set_font("ArialCustom", "", 7.2)
        pdf.set_text_color(51, 65, 85)
        pdf.cell(64, 9, d, border=1, fill=True)
        pdf.cell(52, 9, it, border=1, fill=True)
        pdf.ln()
        fill = not fill

    pdf.ln(3)
    pdf.subsection_title("3.2 Animaciones 3D Guiadas (Secuencias con Clips y Línea de Tiempo)")

    headers_a = [("Misión", 22), ("Archivo GLB", 42), ("Secuencia Pedagógica a Ilustrar", 76), ("Duración", 40)]
    pdf.set_fill_color(15, 23, 42)
    pdf.set_font("ArialCustom", "B", 8)
    pdf.set_text_color(255, 255, 255)
    for h, w in headers_a:
        pdf.cell(w, 7, h, border=1, fill=True, align="C")
    pdf.ln()

    anims_data = [
        ("M1: Teoría", "m1_zoom_celula.glb", "Zoom progresivo desde un organismo visible (hoja/tejido) hacia la célula individual, resaltando su núcleo y postulados.", "20-25 s (con scrub y pausa)"),
        ("M2: Tipos", "m2_comparacion_celular.glb", "Recorrido cinemático sobrevolando célula animal y vegetal, con resaltado secuencial de organelos homólogos y exclusivos.", "20 s (resaltado por pasos)"),
        ("M3: Energía", "m3_plasmolisis_atp.glb", "Secuencia de plasmólisis (vacuola perdiendo agua y arrugamiento), rehidratación y zoom a la mitocondria latiendo con emisión de ATP.", "25 s (clips de acción)")
    ]
    fill = False
    for m, f, s, dur in anims_data:
        pdf.set_fill_color(248, 250, 252) if fill else pdf.set_fill_color(255, 255, 255)
        pdf.set_font("ArialCustom", "B", 7.5)
        pdf.set_text_color(2, 132, 199)
        pdf.cell(22, 8, m, border=1, fill=True)
        pdf.set_font("ArialCustom", "B", 7.5)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(42, 8, f, border=1, fill=True)
        pdf.set_font("ArialCustom", "", 7.2)
        pdf.set_text_color(51, 65, 85)
        pdf.cell(76, 8, s, border=1, fill=True)
        pdf.cell(40, 8, dur, border=1, fill=True)
        pdf.ln()
        fill = not fill

    pdf.ln(3)
    pdf.subsection_title("3.3 Organelos Individuales (Para Cubo Merge AR y Tarjetas de Detalle)")

    headers_o = [("Archivo GLB", 45), ("Estructura", 35), ("Propósito Educativo en la Plataforma", 100)]
    pdf.set_fill_color(15, 23, 42)
    pdf.set_font("ArialCustom", "B", 8)
    pdf.set_text_color(255, 255, 255)
    for h, w in headers_o:
        pdf.cell(w, 7, h, border=1, fill=True, align="C")
    pdf.ln()

    organelos = [
        ("organelo_nucleo.glb", "Núcleo Celular", "Muestra poros nucleares, envoltura y nucleolo. Proyectado en Cubo Merge (cara Núcleo)."),
        ("organelo_mitocondria.glb", "Mitocondria", "Corte transversal con crestas internas visibles. Proyectado en Cubo Merge (cara Mitocondria)."),
        ("organelo_cloroplasto.glb", "Cloroplasto", "Corte interior con tilacoides y granas verdes. Proyectado en Cubo Merge (cara Cloroplasto)."),
        ("organelo_vacuola.glb", "Vacuola Central", "Cuerpo translúcido con material acuoso para turgencia. Proyectado en Cubo Merge (cara Vacuola)."),
        ("organelo_pared.glb", "Pared Celular", "Muestra la estructura rígida de celulosa que da soporte. Proyectado en Cubo Merge (cara Pared)."),
        ("organelo_membrana.glb", "Membrana Plasmática", "Corte de bicapa lipídica con proteínas integrales. Proyectado en Cubo Merge (cara Membrana).")
    ]
    fill = False
    for f, e, p in organelos:
        pdf.set_fill_color(248, 250, 252) if fill else pdf.set_fill_color(255, 255, 255)
        pdf.set_font("ArialCustom", "B", 7.5)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(45, 6, f, border=1, fill=True)
        pdf.set_font("ArialCustom", "B", 7.5)
        pdf.set_text_color(2, 132, 199)
        pdf.cell(35, 6, e, border=1, fill=True)
        pdf.set_font("ArialCustom", "", 7.2)
        pdf.set_text_color(51, 65, 85)
        pdf.cell(100, 6, p, border=1, fill=True)
        pdf.ln()
        fill = not fill

    # ================= PAGE 4: BLENDER Y DESPLIEGUE =================
    pdf.add_page()
    pdf.section_title("4", "Jerarquía de Nodos en Blender y Estándares Técnicos", "Requisitos de modelado para enlazar con Three.js y React Three Fiber")

    pdf.paragraph(
        "Al igual que en el Sistema Circulatorio, el motor React Three Fiber inspecciona el grafo de la escena GLTF buscando mallas por nombre. "
        "Para que los controles de la aplicación puedan ocultar capas, cambiar escalas o iluminar organelos, se debe respetar la siguiente nomenclatura:"
    )

    # Hierarchy tree
    pdf.set_fill_color(241, 245, 249)
    pdf.set_draw_color(203, 213, 225)
    pdf.rect(15, pdf.get_y(), 180, 48, style="FD")
    y_tree = pdf.get_y() + 2
    pdf.set_xy(18, y_tree)
    pdf.set_font("ArialCustom", "B", 8)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 4.5, "Árbol Jerárquico Recomendado en Blender (Outliner):", new_x="LMARGIN", new_y="NEXT")

    nodes = [
        ("Celula_Root", "Pivote general centrado exactamente en coordenadas (0, 0, 0)."),
        (" ├── Membrane", "Malla exterior de la membrana plasmática (permite activar/desactivar capa o transparencia)."),
        (" ├── Cytoplasm", "Malla de citosol con material translúcido."),
        (" ├── Nucleus", "Malla esférica del núcleo con textura o material distintivo."),
        (" ├── Vacuole", "Malla de la vacuola central con su pivote interno centrado (se enlaza al slider de agua)."),
        (" ├── Chloroplast_01/02", "Cloroplastos verdes con canal de emisión (se enlaza al slider de luz solar)."),
        (" ├── Mitochondria_01/02", "Mitocondrias con material dinámico (se enlaza a la animación de pulso y nutrientes)."),
        (" └── CellWall", "Pared celular protectora vegetal (para conmutar visualmente entre animal y vegetal).")
    ]
    for name, desc in nodes:
        pdf.set_x(18)
        pdf.set_font("ArialCustom", "B", 7.5)
        pdf.set_text_color(2, 132, 199) if "Celula" in name else pdf.set_text_color(15, 23, 42)
        pdf.cell(48, 4.3, name)
        pdf.set_font("ArialCustom", "", 7.5)
        pdf.set_text_color(71, 85, 105)
        pdf.cell(126, 4.3, f"— {desc}", new_x="LMARGIN", new_y="NEXT")

    pdf.set_y(y_tree + 50)

    # Technical budgets
    pdf.subsection_title("4.2 Presupuestos Técnicos de Rendimiento (Hardware Escolar)")
    
    budgets = [
        ("Formato de Exportación", "GLB (GLTF 2.0 binario autocontenido con mallas, texturas y materiales empaquetados)."),
        ("Compresión", "Compresión Draco o Meshopt activada para reducir los tiempos de descarga en un 60-70%."),
        ("Poligonaje Máximo", "Modelos principales: <= 25.000 triángulos. Organelos individuales: <= 5.000 - 8.000 triángulos."),
        ("Resolución de Texturas", "Texturas PBR estándar embebidas con resolución máxima de 1024x1024 px."),
        ("Pivote y Normalización", "Origen en (0,0,0) sin desfase para evitar oscilaciones excéntricas en OrbitControls."),
        ("Ruta de Guardado", "360edulabs/public/models/ (dentro del proyecto frontend de React).")
    ]
    for b_title, b_val in budgets:
        pdf.set_font("ArialCustom", "B", 8)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(45, 5, f"• {b_title}:")
        pdf.set_font("ArialCustom", "", 8)
        pdf.set_text_color(51, 65, 85)
        pdf.cell(135, 5, b_val, new_x="LMARGIN", new_y="NEXT")

    pdf.ln(2)
    # Section 5: Cloud Deployment
    pdf.section_title("5", "Variables de Entorno y Configuración de Despliegue", "Pautas para poner en producción el Backend en Render y el Frontend en Vercel")

    pdf.paragraph(
        "Para que la plataforma funcione de forma segura y coordinada entre ambos proveedores de nube, configure las siguientes variables:"
    )

    headers_env = [("Servicio / Entorno", 35), ("Nombre de Variable", 48), ("Valor Asignado / Sugerido", 52), ("Propósito Técnico", 45)]
    pdf.set_fill_color(15, 23, 42)
    pdf.set_font("ArialCustom", "B", 7.5)
    pdf.set_text_color(255, 255, 255)
    for h, w in headers_env:
        pdf.cell(w, 6.5, h, border=1, fill=True, align="C")
    pdf.ln()

    envs = [
        ("Render (Backend)", "FRONTEND_URL", "https://edulabs360.vercel.app", "Habilita el CORS para el dominio de Vercel."),
        ("Render (Backend)", "MONGODB_URI", "mongodb+srv://.../edulab360", "Conexión directa al cluster Atlas."),
        ("Render (Backend)", "NODE_ENV", "production", "Activa cookies seguras (SameSite=None; Secure)."),
        ("Render (Backend)", "JWT_ACCESS_SECRET", "[Cadena secreta de 32+ caracteres]", "Firma criptográfica de sesiones de usuario."),
        ("Render (Backend)", "JWT_REFRESH_SECRET", "[Cadena secreta distinta de 32+ char]", "Firma criptográfica para renovación de token."),
        ("Render (Backend)", "AUTO_SEED", "true", "Siembra automática de misiones y usuarios demo."),
        ("Vercel (Frontend)", "VITE_API_URL", "https://[tu-backend].onrender.com/api/v1", "Punto de enlace del cliente React con la API.")
    ]
    fill = False
    for s, n, v, p in envs:
        pdf.set_fill_color(248, 250, 252) if fill else pdf.set_fill_color(255, 255, 255)
        pdf.set_font("ArialCustom", "B", 7)
        pdf.set_text_color(2, 132, 199) if "Render" in s else pdf.set_text_color(16, 185, 129)
        pdf.cell(35, 6, s, border=1, fill=True)
        pdf.set_font("ArialCustom", "B", 7)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(48, 6, n, border=1, fill=True)
        pdf.set_font("ArialCustom", "", 6.8)
        pdf.set_text_color(225, 29, 72) if "JWT" in n or "MONGODB" in n else pdf.set_text_color(51, 65, 85)
        pdf.cell(52, 6, v, border=1, fill=True)
        pdf.set_font("ArialCustom", "", 6.8)
        pdf.set_text_color(71, 85, 105)
        pdf.cell(45, 6, p, border=1, fill=True)
        pdf.ln()
        fill = not fill

    pdf.ln(3)
    pdf.tip_box(
        "Ajustes de Compilación en Render (Web Service):",
        "• Root Directory: 360edulabsbknd\n"
        "• Build Command: npm install && npm run build\n"
        "• Start Command: npm start\n"
        "• Nota: Los ajustes de trust proxy y cookies cross-domain ya quedaron incorporados en el código fuente."
    )

    pdf.output(output_path)
    print(f"PDF generado exitosamente en: {output_path}")

if __name__ == "__main__":
    out_file = os.path.abspath(r"c:\Users\USUARIO\Desktop\360\Guia_Maestra_CitoIndagar360.pdf")
    build_pdf(out_file)

